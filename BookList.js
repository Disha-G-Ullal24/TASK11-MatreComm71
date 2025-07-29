import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");

        if (res.data.length === 0) {
          // Dummy fallback books if backend is empty
          setBooks([
            { _id: "1", title: "Atomic Habits", author: "James Clear", averageRating: 4.9 },
            { _id: "2", title: "It Ends With Us", author: "Colleen Hoover", averageRating: 4.7 },
            { _id: "3", title: "It Begins With Us", author: "Colleen Hoover", averageRating: 4.6 },
            { _id: "4", title: "Ugly Love", author: "Colleen Hoover", averageRating: 4.5 },
            { _id: "5", title: "The Overthinker", author: "Nicholas Trenton", averageRating: 4.4 },
            { _id: "6", title: "The Warmth of Other Suns", author: "Isabel Wilkerson", averageRating: 4.8 },
            { _id: "7", title: "The Great Gatsby", author: "F. Scott Fitzgerald", averageRating: 4.3 },
            { _id: "8", title: "To Kill a Mockingbird", author: "Harper Lee", averageRating: 4.9 },
            { _id: "9", title: "1984", author: "George Orwell", averageRating: 4.7 }
          ]);
        } else {
          setBooks(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
        // If API fails, show dummy books
        setBooks([
          { _id: "1", title: "Atomic Habits", author: "James Clear", averageRating: 4.9 },
          { _id: "2", title: "It Ends With Us", author: "Colleen Hoover", averageRating: 4.7 },
          { _id: "3", title: "It Begins With Us", author: "Colleen Hoover", averageRating: 4.6 },
          { _id: "4", title: "Ugly Love", author: "Colleen Hoover", averageRating: 4.5 },
          { _id: "5", title: "The Overthinker", author: "Nicholas Trenton", averageRating: 4.4 },
          { _id: "6", title: "The Warmth of Other Suns", author: "Isabel Wilkerson", averageRating: 4.8 },
          { _id: "7", title: "The Great Gatsby", author: "F. Scott Fitzgerald", averageRating: 4.3 },
          { _id: "8", title: "To Kill a Mockingbird", author: "Harper Lee", averageRating: 4.9 },
          { _id: "9", title: "1984", author: "George Orwell", averageRating: 4.7 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading books...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Book List</h1>
      <div className="row">
        {books.length === 0 ? (
          <p className="text-center text-muted">No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <Link to={`/books/${book._id}`} className="text-decoration-none">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">{book.author}</p>
                    <p className="text-warning">
                      ⭐ {book.averageRating?.toFixed(1) || 0}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;
