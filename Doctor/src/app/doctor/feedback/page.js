"use client";

import { useState, useEffect } from "react";
import { feedbackData } from "../../../mockData/feedbackData"; // CORRECTED PATH
import FeedbackOverview from "../../../components/doctor/feedback/FeedbackOverview";
import FeedbackList from "../../../components/doctor/feedback/FeedbackList";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState({ overview: {}, reviews: [] });

  useEffect(() => {
    setFeedback(feedbackData);
  }, []);

  return (
    <main className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Patient Feedback
        </h1>
        <p className="text-gray-600 mt-2">
          Review patient satisfaction scores and comments to improve care.
        </p>
      </div>
      
      <div className="space-y-6">
        <FeedbackOverview overview={feedback.overview} />
        <FeedbackList reviews={feedback.reviews} />
      </div>
    </main>
  );
}