
import React from "react";

const CourseReviews: React.FC = () => {
  // Sample reviews (would come from the API in a real implementation)
  const reviews = [
    { id: 1, author: "John D.", rating: 5, comment: "Excellent course with clear explanations" },
    { id: 2, author: "Sarah M.", rating: 4, comment: "Very informative and well-structured" },
    { id: 3, author: "David R.", rating: 5, comment: "The practical examples were very helpful" },
  ];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-${i < rating ? "yellow-500" : "gray-300"}`}>
          ★
        </span>
      ));
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
      <div className="mb-6">
        <div className="text-4xl font-bold mb-2">4.7</div>
        <div className="flex text-yellow-500 text-xl mb-2">★★★★★</div>
        <div className="text-muted-foreground">Based on {reviews.length} reviews</div>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-border">
            <div className="flex items-center mb-2">
              <div className="font-medium mr-3">{review.author}</div>
              <div className="text-yellow-500">{renderStars(review.rating)}</div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseReviews;
