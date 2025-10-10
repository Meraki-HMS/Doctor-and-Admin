"use client";

import { useState, useMemo } from "react";
import RatingStars from "./RatingStars";

export default function FeedbackList({ reviews }) {
  const [ratingFilter, setRatingFilter] = useState(0); // 0 means all
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, highest, lowest

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Filter by rating
    if (ratingFilter > 0) {
      filtered = filtered.filter(review => review.rating === ratingFilter);
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'newest':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  }, [reviews, ratingFilter, sortBy]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Individual Reviews</h2>
        
        {/* Filters and Sort */}
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                {[0, 5, 4, 3].map(star => (
                    <button 
                        key={star}
                        onClick={() => setRatingFilter(star)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${ratingFilter === star ? 'bg-white shadow-sm text-green-600' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        {star === 0 ? 'All' : `${star} ★`}
                    </button>
                ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.length > 0 ? (
          filteredAndSortedReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{review.patientName}</h4>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <RatingStars rating={review.rating} size="text-lg" />
              </div>
              <p className="text-gray-700 mt-3">{review.comment}</p>
              {review.tags && review.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {review.tags.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <i className="bi bi-chat-quote text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No Reviews Found</h3>
            <p className="text-gray-400 mt-1">There are no reviews matching your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}