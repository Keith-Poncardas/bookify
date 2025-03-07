const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Book = require('../models/bookSchema'); // Adjust the path as needed
require('dotenv').config(); // Load environment variables

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Read JSON data
const dataPath = path.join(__dirname, 'books.json'); // Adjust file name if needed
const booksData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const seedDatabase = async () => {
  try {
    await Book.deleteMany(); // Clear existing data
    await Book.insertMany(booksData);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
