import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  reviews: [reviewSchema],
}, { timestamps: true });

// ✅ Prevent OverwriteModelError:
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;
