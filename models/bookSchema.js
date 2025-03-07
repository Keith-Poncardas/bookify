const mongoose = require('mongoose');
const { BookGenres } = require('../utils/options');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: [String], required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  genre: {
    type: String,
    enum: BookGenres,
    required: true
  },
  city: { type: String, required: true },
  country: { type: String, required: true },
  yearPublished: { type: Number, required: true },
  languages: { type: [String], required: true },
  bookPage: { type: Number, required: true },
  description: { type: String, required: true },
  buyLink: { type: String, required: true },
  posterImages: { type: [String], required: true }
});

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;