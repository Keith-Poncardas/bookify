const logger = require('../console/logger');
const Book = require('../models/bookSchema');
const { separateByComma } = require('../utils/helpers');

/**
 * Uploads a new book to the database.
 * 
 * This function takes a book object, processes its properties, and creates a new entry in the database.
 * Certain fields (author, languages, posterImages) are formatted using `separateByComma`.
 * 
 * @param {Object} options - The input options containing the book details.
 * @param {Object} options.book - The book data to be uploaded.
 * @param {string} options.book.author - The book's author(s), which may be a comma-separated string.
 * @param {string} options.book.languages - The language(s) the book is available in, which may be a comma-separated string.
 * @param {string} options.book.posterImages - URLs of the book's poster images, which may be a comma-separated string.
 * @returns {Promise<Object>} - The created book document from the database.
 */
const uploadBook = async ({ book }) => {
  const { author, languages, posterImages } = book;
  return await Book.create({
    ...book,
    author: separateByComma(author),
    languages: separateByComma(languages),
    posterImages: separateByComma(posterImages)
  });
};

/**
 * Retrieves a paginated list of books from the database based on query parameters.
 * 
 * This function allows filtering, searching, and sorting of books based on user input.
 * It supports pagination and returns relevant metadata such as the current page and total pages.
 * 
 * @param {Object} options - The input options containing query parameters.
 * @param {Object} options.query - The query parameters for filtering, sorting, and pagination.
 * @param {string} [options.query.search] - A search term to match against book title, author, description, or genre.
 * @param {string} [options.query.bookGenre] - A specific book genre to filter by.
 * @param {string} [options.query.filterBy] - An alternative filter for genre.
 * @param {string} [options.query.sortBy] - Sorting criteria (e.g., "Most Popular", "Latest").
 * @param {number} [options.query.page=1] - The page number for pagination (default is 1).
 * @returns {Promise<Object>} - An object containing:
 *   - `books` (Array): The list of books that match the criteria.
 *   - `currentPage` (number): The current page number.
 *   - `totalPages` (number): The total number of available pages.
 */
const getBooks = async ({ query }) => {
  try {
    const { search, bookGenre, filterBy, sortBy, page = 1, distinctItem } = query || {};
    const limit = 10;
    const currentPage = parseInt(page);

    let filter = {};

    // Search filter: Matches title, author, description, or genre using case-insensitive regex
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } }
      ];
    };

    // Genre filter (either `bookGenre` or `filterBy` is used)
    if (bookGenre) {
      filter.genre = bookGenre;
    };

    if (filterBy) {
      filter.genre = filterBy;
    };

    // Sorting criteria
    const filterSort = {};

    if (sortBy) {
      switch (sortBy) {
        case 'Most Popular':
          filterSort.rating = -1; // Sort by highest rating
          break;
        case 'Latest':
          filterSort.yearPublished = -1; // Sort by latest publication year
          break;
        default:
          break
      }
    };

    // If `distinctItem` is provided, return unique genres instead of books
    if (distinctItem === "genre") {
      const genresWithCounts = await Book.aggregate([
        {
          $group: {
            _id: "$genre",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]); // Get unique genres from books
      return { genres: genresWithCounts };
    }

    // Fetch total document count for pagination
    const totalDocuments = await Book.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    // Fetch books with filtering, sorting, and pagination applied
    const books = await Book.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .sort(filterSort);

    return { books, currentPage, totalPages, totalDocuments };
  } catch (err) {
    logger.error(`Error fetching books: ${err.message}`);
  }
};

/**
 * Retrieves a book by its unique ID from the database.
 * 
 * @param {Object} options - The input options containing the book ID.
 * @param {string} options.bookId - The unique identifier of the book.
 * @returns {Promise<Object|null>} - The book document if found, otherwise `null`.
 */
const viewBook = async ({ bookId }) => {
  return await Book.findById(bookId);
};

/**
 * Updates an existing book in the database.
 * 
 * This function finds a book by its ID and updates its details with the provided data.
 * 
 * @param {Object} options - The input options containing the book ID and update data.
 * @param {string} options.bookId - The unique identifier of the book to update.
 * @param {Object} options.bookData - The updated book data.
 * @returns {Promise<Object|null>} - The updated book document if found, otherwise `null`.
 */
const editBook = async ({ bookId, bookData }) => {

  const { author, languages, posterImages } = bookData;

  return await Book.findByIdAndUpdate(
    bookId,
    {
      ...bookData,
      author: separateByComma(author),
      languages: separateByComma(languages),
      posterImages: separateByComma(posterImages)
    },
    { new: true });
};

/**
 * Deletes a book from the database by its ID.
 * 
 * This function removes a book document from the database based on the provided book ID.
 * 
 * @param {Object} options - The input options containing the book ID.
 * @param {string} options.bookId - The unique identifier of the book to delete.
 * @returns {Promise<Object|null>} - The deleted book document if found and deleted, otherwise `null`.
 */
const deleteBook = async ({ bookId }) => {
  return await Book.findByIdAndDelete(bookId);
};

module.exports = { uploadBook, getBooks, viewBook, editBook, deleteBook };
