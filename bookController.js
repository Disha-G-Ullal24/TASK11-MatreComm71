import Book from "../models/bookModel.js";
import Review from "../models/reviewModel.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviews = await Review.find({ book: book._id }).populate("user", "name");
  res.json({ ...book.toObject(), reviews });
};
