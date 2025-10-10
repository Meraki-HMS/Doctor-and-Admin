"use client";

import RatingStars from "./RatingStars";

export default function FeedbackOverview({ overview }) {
  if (!overview || !overview.ratingDistribution) {
    return (
        <div className="bg-white rounded-2xl p-6 text-center text-gray-500">
            Loading feedback data...
        </div>
    );
  }

  const maxRatingCount = Math.max(...overview.ratingDistribution.map(r => r.count), 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback Summary</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Average Rating */}
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center border border-gray-200">
            <p className="text-sm font-medium text-gray-600">Overall Patient Satisfaction</p>
            <p className="text-5xl font-bold text-gray-800 my-2">{overview.averageRating?.toFixed(1)}</p>
            <RatingStars rating={overview.averageRating} size="text-2xl" />
            <p className="text-sm text-gray-500 mt-2">Based on {overview.totalReviews} reviews</p>
        </div>

        {/* Card 2: Rating Distribution Chart */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {overview.ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{item.stars} Stars</span>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className="bg-green-500 h-4 rounded-full flex items-center justify-end pr-2" 
                            style={{ width: `${(item.count / maxRatingCount) * 100}%` }}
                        >
                           <span className="text-xs font-bold text-white">{item.count}</span>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>

        {/* Card 3: Common Positive Mentions */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">What Patients Appreciate</h3>
            <div className="flex flex-wrap gap-2">
                {overview.positiveMentions?.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}