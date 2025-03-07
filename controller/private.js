const logger = require("../console/logger");
const { BookGenres } = require('../utils/options');
const { getBooks } = require("../service/bookService");
const { getNavbarConfig } = require("../utils/navbarConfig");

const retrieveHomeDashboard = async (req, res) => {
  try {
    const books = await getBooks({ query: req.query });

    res.render('private/home', { ...books, BookGenres, ...getNavbarConfig('dashboard') });
  } catch (err) {
    logger.error(`Error parsing data: ${err.message}`);
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

module.exports = { retrieveHomeDashboard, logout };