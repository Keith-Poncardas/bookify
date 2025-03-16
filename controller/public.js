const logger = require("../console/logger");
const { BookGenres, SortOptions } = require('../utils/options');
const { getBooks, viewBook } = require("../service/bookService");
const { getNavbarConfig } = require('../utils/navbarConfig');
const seo = require('express-seo')();

/**
 * Asynchronously retrieves books based on the request query and renders the home page.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters from the request.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the books are retrieved and the page is rendered.
 * @throws {Error} - If there is an error retrieving the books.
 */
const retrieveBooks = async (req, res) => {
  try {
    const books = await getBooks({ query: req.query });

    res.render('public/home', {
      ...books,
      BookGenres,
      SortOptions,
      ...getNavbarConfig('home'),
    });
  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to retrieve books.', 500);
  }
};

/**
 * Retrieves a book by its ID and renders the view with the book details and additional books.
 *
 * @async
 * @function retrieveBook
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the book to retrieve.
 * @param {Object} req.query - The query parameters for retrieving additional books.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} Renders the view with the book details and additional books.
 * @throws Will log an error message if there is an issue retrieving the book.
 */
const retrieveBook = async (req, res) => {
  const { id } = req.params;
  try {

    const book = await viewBook({ bookId: id });
    const books = await getBooks({ query: req.query });

    res.locals.seo.add(res, {
      title: `${book.title} - Bookify`,
      description: book.description || "Read this amazing book on Bookify!",
      keywords: `${book.genre}, ${book.author}, books, reading`,
      image: book.posterImages[0] || "https://i.ibb.co/7dDktDc5/bookifyph-vercel-app.png",
      url: `https://bookifyph.vercel.app/book/${id}/view?bookGenre=${book.genre}`,
      twitterCard: book.posterImages[0] || "https://i.ibb.co/7dDktDc5/bookifyph-vercel-app.png"
    });

    res.render('public/view', { book, ...books, ...getNavbarConfig('view') });
  } catch (err) {
    logger.error(err.message);
    throw new BookifyError('Failed to retrieve book.', 500);
  }
};

module.exports = { retrieveBooks, retrieveBook };