import PropertyCard from './PropertyCard';

export default function PropertyGrid({ properties, onToggleFavourite, loading }) {
  if (loading) {
    return (
      <div className="properties-grid">
        {[...Array(6)].map((_, i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton-img" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
            <div className="skeleton-line price" />
          </div>
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🏘️</div>
        <p className="empty-state-text">No properties available right now.<br />Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="properties-grid">
      {properties.map((property, index) => (
        <div key={property._id} style={{ animationDelay: `${index * 0.08}s` }}>
          <PropertyCard property={property} onToggleFavourite={onToggleFavourite} />
        </div>
      ))}
    </div>
  );
}
