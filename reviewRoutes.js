import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

router.post("/:bookId", async (req, res) => {
  try {
    const { review, rating } = req.body;

    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = {
      review,
      rating: Number(rating),
      user: { name: "Anonymous" }, 
    };

    
    book.reviews.push(newReview);

    
    book.averageRating =
      book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length;

    
    await book.save();

    res.json(book); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

export default router;
