const { getNavbarConfig } = require("./navbarConfig");

class BookifyError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  };
};

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  res.render('error/centralizedError', { statusCode, message, ...getNavbarConfig('home') });
};

module.exports = { BookifyError, catchAsync, errorHandler };