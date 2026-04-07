import FavouriteItem from './FavouriteItem';

export default function FavouritesSidebar({ favourites, onRemove, loading }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <span>❤️ My Favourites</span>
          {favourites.length > 0 && (
            <span className="sidebar-count">{favourites.length}</span>
          )}
        </div>
      </div>
      <div className="sidebar-list">
        {loading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <div className="fav-item" key={i} style={{ opacity: 1 }}>
                <div className="skeleton" style={{ width: 64, height: 48, flexShrink: 0 }} />
                <div className="fav-item-info">
                  <div className="skeleton" style={{ height: 12, width: '80%', marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 12, width: '50%' }} />
                </div>
              </div>
            ))}
          </>
        ) : favourites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🤍</div>
            <p className="empty-state-text">
              No favourites yet.<br />Click the heart on a property to save it!
            </p>
          </div>
        ) : (
          favourites.map((fav, index) => (
            <FavouriteItem
              key={fav._id}
              favourite={fav}
              onRemove={onRemove}
              index={index}
            />
          ))
        )}
      </div>
    </aside>
  );
}
