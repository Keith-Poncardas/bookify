const logger = require("../console/logger");
const { BookGenres } = require('../utils/options');
const { getBooks, uploadBook, editBook, viewBook, deleteBook, deleteSelected } = require("../service/bookService");
const { getNavbarConfig } = require("../utils/navbarConfig");
const { BookifyError } = require("../utils/errorHandler");

/**
 * Renders the home dashboard page.
 *
 * @function retrieveHomeDashboard
 * @param {Object} req - Express request object.
 * @param {Object} req.originalUrl - The original URL of the request.
 * @param {Object} res - Express response object.
 * @returns {void} Renders the home dashboard page with navigation configuration and request path.
 */
const retrieveHomeDashboard = async (req, res) => {
  try {
    const { genres } = await getBooks({ query: { distinctItem: 'genre' } });
    const { totalDocuments } = await getBooks({});

    res.render('private/home', {
      path: req.path,
      ...getNavbarConfig('dashboard'),
      totalDocs: totalDocuments,
      genres: genres || [],
    });

  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to retrieve home dashboard.', 500);
  };
};

/**
 * Renders the carousel page.
 *
 * @function retrieveCarousel
 * @param {Object} req - Express request object.
 * @param {Object} req.originalUrl - The original URL of the request.
 * @param {Object} res - Express response object.
 * @returns {void} Renders the carousel page with navigation configuration and request path.
 */
const retrieveCarousel = (req, res) => {
  res.render('private/carousel', {
    ...getNavbarConfig('dashboard'),
    path: req.path,
  });
};

/**
 * Retrieves and displays a list of books based on the query parameters.
 *
 * @async
 * @function retrieveBooks
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters for filtering books.
 * @param {Object} req.originalUrl - The original URL of the request.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Renders the books page with the retrieved books, genres, navigation config, and request path.
 * @throws Logs an error if retrieving books fails.
 */
const retrieveBooks = async (req, res) => {
  try {
    const books = await getBooks({ query: req.query });

    res.render('private/books', {
      ...books,
      BookGenres,
      ...getNavbarConfig('dashboard'),
      path: req.path,
    });
  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to retrieve dashboard books.', 500);
  };
};

/**
 * Renders the upload form for adding a new book.
 *
 * @async
 * @function retrieveUploadForm
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Renders the upload form with necessary configurations.
 */
const retrieveUploadForm = async (req, res) => {

  res.render('private/upload', {
    ...getNavbarConfig('dashboard'),
    BookGenres,
  });
};

/**
 * Retrieves the edit form for a specific book.
 *
 * @async
 * @function retrieveEditForm
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - The ID of the book to be edited.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Renders the edit form with book details and necessary configurations.
 * @throws Logs an error if retrieving the book fails.
 */
const retrieveEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await viewBook({ bookId: id });

    res.render('private/edit', {
      book,
      ...getNavbarConfig('dashboard'),
      BookGenres,
    });
  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to retrieve dashboard edit form.', 500);
  };
};

/**
 * Uploads a new book to the system.
 *
 * @async
 * @function uploadNewBook
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The book data to be uploaded.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Redirects to the dashboard after a successful upload.
 * @throws Logs an error if the upload fails.
 */
const uploadNewBook = async (req, res) => {
  try {
    await uploadBook({ book: req.body });
    res.redirect('/dashboard');
  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to upload the book.', 500);
  };
};

/**
 * Updates the details of an existing book.
 *
 * @async
 * @function updateBook
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - The ID of the book to be updated.
 * @param {Object} req.body - The updated book data.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Redirects to the dashboard after a successful update.
 * @throws Logs an error if the update fails.
 */
const updateBook = async (req, res) => {
  try {
    await editBook({ bookId: req.params.id, bookData: req.body });
    res.redirect('/dashboard');
  } catch (err) {
    logger.error(`Error edit this book: ${err.message}`);
    throw new BookifyError('Failed to edit the book.', 500);
  };
};

/**
 * Handles the removal of a book from the system.
 *
 * @async
 * @function removeBook
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - The ID of the book to be deleted.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Redirects to the dashboard after successful deletion.
 * @throws Logs an error if deletion fails.
 */
const removeBook = async (req, res) => {
  try {
    await deleteBook({ bookId: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to remove the book.', 500);
  };
};

/**
 * Deletes multiple books based on the provided IDs in the request body.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success or error message
 */
const killSelected = async (req, res) => {
  try {
    if (!req.body.ids || req.body.ids.length === 0) {
      return res.status(400).json({ error: 'No IDs provided' }); // 🚨 Error if no IDs are given
    }

    await deleteSelected({ bookIds: req.body.ids });

    return res.json({ message: 'Books deleted successfully' }); // ✅ JSON response
  } catch (err) {

    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
    throw new BookifyError('Failed to remove all selected items.', 500);

  }
};


/**
 * Logs out the user by clearing the authentication token cookie and redirecting to the login page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

module.exports = { retrieveHomeDashboard, retrieveUploadForm, uploadNewBook, retrieveEditForm, updateBook, removeBook, retrieveBooks, retrieveCarousel, killSelected, logout };