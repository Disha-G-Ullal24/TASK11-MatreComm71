import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import ReviewForm from "./ReviewForm";
import { FaStar } from "react-icons/fa";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = useCallback(async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data); // Fetching actual backend book
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!book) return <p className="text-center">Book not found</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p className="text-warning">
          ⭐ Average Rating: {book.averageRating?.toFixed(1) || 0}
        </p>

        <h4 className="mt-4">Reviews</h4>
        {book.reviews?.length === 0 ? (
          <p className="text-muted">No reviews yet.</p>
        ) : (
          <ul className="list-group mb-4">
            {book.reviews.map((r) => (
              <li key={r._id} className="list-group-item">
                <strong>{r.user?.name || "Anonymous"}</strong>: {r.review}
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={16}
                      className={star <= r.rating ? "text-warning" : "text-secondary"}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Review Form */}
        <ReviewForm bookId={id} onReviewAdded={fetchBook} />
      </div>
    </div>
  );
}

export default BookDetails;
