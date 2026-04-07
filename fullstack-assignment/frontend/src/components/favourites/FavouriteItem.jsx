export default function FavouriteItem({ favourite, onRemove, index }) {
  return (
    <div
      className="fav-item"
      id={`fav-item-${favourite._id}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <img
        className="fav-item-img"
        src={favourite.imageUrl || favourite.image_url}
        alt={favourite.title}
        onError={(e) => {
          e.target.src = 'https://placehold.co/128x96/1a1a2e/10b981?text=Img';
        }}
      />
      <div className="fav-item-info">
        <p className="fav-item-title">{favourite.title}</p>
        <p className="fav-item-price">${favourite.price.toLocaleString()}</p>
      </div>
      <button
        className="fav-item-remove"
        onClick={() => onRemove(favourite._id)}
        title="Remove from favourites"
        aria-label="Remove from favourites"
      >
        ✕
      </button>
    </div>
  );
}
