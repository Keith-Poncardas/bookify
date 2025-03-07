const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  posterImages: { type: [String], required: true }
});

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = Carousel;