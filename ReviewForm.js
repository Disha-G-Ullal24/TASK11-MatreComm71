import React, { useState } from "react";
import api from "../api/api";

function ReviewForm({ bookId, onReviewAdded }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/reviews/${bookId}`, { review, rating });

      setReview("");
      setRating(0);
      setError("");

      onReviewAdded();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <form onSubmit={submitReview} className="mt-4">
      {error && <p className="text-danger">{error}</p>}
      <textarea
        className="form-control mb-2"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <select
        className="form-select mb-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      >
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r} Star</option>
        ))}
      </select>
      <button className="btn btn-primary" type="submit">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
