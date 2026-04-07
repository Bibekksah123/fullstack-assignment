import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { propertiesAPI, favouritesAPI } from '../api';
import Layout from '../components/layout/Layout';
import PropertyGrid from '../components/properties/PropertyGrid';
import FavouritesSidebar from '../components/favourites/FavouritesSidebar';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exit: true } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  // Load properties
  const loadProperties = useCallback(async () => {
    try {
      const { data } = await propertiesAPI.getAll();
      setProperties(data.properties);
    } catch (error) {
      showToast('Failed to load properties', 'error');
    } finally {
      setLoadingProps(false);
    }
  }, [showToast]);

  // Load favourites
  const loadFavourites = useCallback(async () => {
    try {
      const { data } = await favouritesAPI.getAll();
      setFavourites(data.favourites);
    } catch (error) {
      showToast('Failed to load favourites', 'error');
    } finally {
      setLoadingFavs(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => {
    loadProperties();
    loadFavourites();
  }, [loadProperties, loadFavourites]);

  // Toggle favourite
  const handleToggleFavourite = async (propertyId, isFavourite) => {
    try {
      if (isFavourite) {
        await favouritesAPI.remove(propertyId);
        showToast('Removed from favourites');
      } else {
        await favouritesAPI.add(propertyId);
        showToast('Added to favourites! ❤️');
      }
      // Refresh both lists
      await Promise.all([loadProperties(), loadFavourites()]);
    } catch (error) {
      showToast(error.response?.data?.error || 'Action failed', 'error');
    }
  };

  // Remove favourite (from sidebar)
  const handleRemoveFavourite = async (propertyId) => {
    try {
      await favouritesAPI.remove(propertyId);
      showToast('Removed from favourites');
      await Promise.all([loadProperties(), loadFavourites()]);
    } catch (error) {
      showToast(error.response?.data?.error || 'Failed to remove', 'error');
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <FavouritesSidebar
          favourites={favourites}
          onRemove={handleRemoveFavourite}
          loading={loadingFavs}
        />
        <main className="main-content">
          <div className="main-header">
            <h1 className="main-title">
              <span>🏘️</span> Available Properties
              {!loadingProps && (
                <span className="property-count">({properties.length})</span>
              )}
            </h1>
          </div>
          <PropertyGrid
            properties={properties}
            onToggleFavourite={handleToggleFavourite}
            loading={loadingProps}
          />
        </main>
      </div>

      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.type} ${toast.exit ? 'toast-exit' : ''}`}
            >
              <span className="toast-icon">
                {toast.type === 'error' ? '⚠️' : '✅'}
              </span>
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
