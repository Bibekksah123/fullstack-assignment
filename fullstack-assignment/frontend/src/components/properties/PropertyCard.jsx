export default function PropertyCard({ property, onToggleFavourite }) {
  const isFav = property.is_favourite === 1;

  const formatPrice = (price) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="property-card" id={`property-${property._id}`}>
      <div className="property-card-img-container">
        <img
          className="property-card-img"
          src={property.imageUrl || property.image_url}
          alt={property.title}
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/1a1a2e/10b981?text=Property';
          }}
        />
        {property.propertyType && (
          <span className="property-card-badge">{property.propertyType}</span>
        )}
      </div>
      <div className="property-card-body">
        <h3 className="property-card-title">{property.title}</h3>
        <p className="property-card-address">
          <span>📍</span> {property.address}
        </p>
        <div className="property-card-stats">
          {property.bedrooms > 0 && (
            <span className="property-stat">
              <span className="property-stat-icon">🛏️</span> {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="property-stat">
              <span className="property-stat-icon">🛁</span> {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
            </span>
          )}
          {property.sqft > 0 && (
            <span className="property-stat">
              <span className="property-stat-icon">📐</span> {property.sqft.toLocaleString()} sqft
            </span>
          )}
        </div>
        <div className="property-card-footer">
          <span className="property-price">{formatPrice(property.price)}</span>
          <button
            className={`btn-favourite ${isFav ? 'active' : ''}`}
            id={`fav-btn-${property._id}`}
            onClick={() => onToggleFavourite(property._id, isFav)}
          >
            <span className="btn-favourite-icon">{isFav ? '❤️' : '🤍'}</span>
            {isFav ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
