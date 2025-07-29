import mongoose from "mongoose";
import Book from "./models/bookModel.js";

mongoose.connect("mongodb://127.0.0.1:27017/bookReviewApp");

const books = [
  { title: "Atomic Habits", author: "James Clear" },
  { title: "It Ends With Us", author: "Colleen Hoover" },
  { title: "It Begins With Us", author: "Colleen Hoover" },
  { title: "Ugly Love", author: "Colleen Hoover" },
  { title: "The Overthinker", author: "Nicholas Trenton" },
  { title: "The Warmth of Other Suns", author: "Isabel Wilkerson" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
];

const seedBooks = async () => {
  await Book.deleteMany();
  await Book.insertMany(books);
  console.log("Books seeded");
  mongoose.connection.close();
};

seedBooks();
