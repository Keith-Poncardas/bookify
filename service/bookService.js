const logger = require('../console/logger');
const Book = require('../models/bookSchema');
const { separateByComma } = require('../utils/helpers');

const uploadBook = async ({ book }) => {
  const { author, languages, posterImages } = book;
  return await Book.create({ ...book, author: separateByComma(author), languages: separateByComma(languages), posterImages: separateByComma(posterImages) });
};

const getBooks = async ({ query }) => {
  try {
    const { search, bookGenre, filterBy, sortBy, page = 1 } = query || {};
    const limit = 10;
    const currentPage = parseInt(page);

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } }
      ];
    };

    if (bookGenre) {
      filter.genre = bookGenre;
    };

    if (filterBy) {
      filter.genre = filterBy;
    };

    const filterSort = {};

    if (sortBy) {
      switch (sortBy) {
        case 'Most Popular':
          filterSort.rating = -1;
          break;
        case 'Latest':
          filterSort.yearPublished = -1;
          break;
        default:
          break
      }
    };

    const totalDocuments = await Book.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const books = await Book.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .sort(filterSort);

    return { books, currentPage, totalPages };
  } catch (err) {
    logger.error(`Error fetching books: ${err.message}`);
  }
};

const viewBook = async ({ bookId }) => {
  return await Book.findById(bookId);
};

const editBook = async ({ bookId, bookData }) => {
  return await Book.findByIdAndUpdate(bookId, bookData, { new: true });
};

const deleteBook = async ({ bookId }) => {
  return await Book.findByIdAndDelete(bookId);
};

module.exports = { uploadBook, getBooks, viewBook, editBook, deleteBook };
