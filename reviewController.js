import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";

export const addReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, review } = req.body;

  const existingReview = await Review.findOne({ user: req.user._id, book: bookId });
  if (existingReview) return res.status(400).json({ message: "Already reviewed this book" });

  const newReview = await Review.create({
    user: req.user._id,
    book: bookId,
    rating,
    review
  });

  await updateBookAverageRating(bookId);
  res.json(newReview);
};

export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  review.rating = req.body.rating || review.rating;
  review.review = req.body.review || review.review;
  await review.save();

  await updateBookAverageRating(review.book);
  res.json(review);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await review.remove();
  await updateBookAverageRating(review.book);
  res.json({ message: "Review deleted" });
};

const updateBookAverageRating = async (bookId) => {
  const reviews = await Review.find({ book: bookId });
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;
  await Book.findByIdAndUpdate(bookId, { averageRating: avg });
};
