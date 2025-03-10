const logger = require("../console/logger");
const { BookGenres } = require('../utils/options');
const { getBooks, uploadBook, editBook, viewBook, deleteBook } = require("../service/bookService");
const { getNavbarConfig } = require("../utils/navbarConfig");

const retrieveHomeDashboard = async (req, res) => {
  try {
    const books = await getBooks({ query: req.query });
    res.render('private/home', { ...books, BookGenres, ...getNavbarConfig('dashboard') });
  } catch (err) {
    logger.error(`Error parsing data: ${err.message}`);
  }
};

const retrieveUploadForm = async (req, res) => {
  res.render('private/upload', { ...getNavbarConfig('dashboard'), BookGenres });
};

const retrieveEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await viewBook({ bookId: id });
    res.render('private/edit', { book, ...getNavbarConfig('dashboard'), BookGenres });
  } catch (err) {
    logger.error(err.message);
  }
}

const uploadNewBook = async (req, res) => {
  try {
    await uploadBook({ book: req.body });
    res.redirect('/dashboard');
  } catch (err) {
    logger.error(`Error posting book: ${err.message}`);
  }
};

const updateBook = async (req, res) => {
  try {
    await editBook({ bookId: req.params.id, bookData: req.body });
    res.redirect('/dashboard');
  } catch (err) {
    logger.error(`Error edit this book: ${err.message}`);
  }
}

const removeBook = async (req, res) => {
  try {
    await deleteBook({ bookId: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    logger.error(err);
  }
}

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

module.exports = { retrieveHomeDashboard, retrieveUploadForm, uploadNewBook, retrieveEditForm, updateBook, removeBook, logout };