"use client";

export default function RatingStars({ rating, totalStars = 5, size = 'text-xl' }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center text-yellow-400 ${size}`}>
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="bi bi-star-fill"></i>
      ))}
      {halfStar && <i className="bi bi-star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="bi bi-star"></i>
      ))}
    </div>
  );
}