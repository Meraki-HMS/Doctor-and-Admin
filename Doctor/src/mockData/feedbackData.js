export const feedbackData = {
  // Overall statistics for the overview component
  overview: {
    averageRating: 4.7,
    totalReviews: 85,
    ratingDistribution: [
      { stars: 5, count: 65 },
      { stars: 4, count: 15 },
      { stars: 3, count: 3 },
      { stars: 2, count: 1 },
      { stars: 1, count: 1 },
    ],
    positiveMentions: [ // Tags for common positive feedback
      "Good Listener", "Clear Explanation", "Empathic", "Efficient", "Helpful Staff"
    ],
  },
  // List of individual feedback entries
  reviews: [
    {
      id: 1,
      patientName: "John Smith",
      date: "2024-01-25",
      rating: 5,
      comment: "Dr. Wilson was incredibly thorough and took the time to explain my condition and treatment plan clearly. I felt very heard and respected. The entire process was efficient and professional.",
      tags: ["Clear Explanation", "Good Listener"]
    },
    {
      id: 2,
      patientName: "Maria Garcia",
      date: "2024-01-24",
      rating: 5,
      comment: "An excellent and caring doctor. She showed great empathy and made me feel comfortable throughout the consultation. Highly recommended.",
      tags: ["Empathic"]
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      date: "2024-01-22",
      rating: 4,
      comment: "The consultation was good and the advice was helpful. The only downside was the slightly long waiting time before the appointment.",
      tags: []
    },
    {
      id: 4,
      patientName: "Anonymous",
      date: "2024-01-20",
      rating: 5,
      comment: "Very professional and knowledgeable. The front desk staff were also very helpful and friendly.",
      tags: ["Helpful Staff"]
    },
    {
      id: 5,
      patientName: "David Miller",
      date: "2024-01-18",
      rating: 3,
      comment: "The doctor is knowledgeable, but the consultation felt a bit rushed. I would have appreciated a few more minutes to discuss my concerns.",
      tags: []
    }
  ]
};