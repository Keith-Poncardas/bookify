const { getNavbarConfig } = require("./navbarConfig");

/**
 * Custom error class for handling application-specific errors in Bookify.
 * Extends the built-in JavaScript `Error` class to include additional properties.
 */
class BookifyError extends Error {
  /**
   * Creates an instance of BookifyError.
   * 
   * @param {string} message - A descriptive error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  constructor(message, statusCode) {
    super(message);

    /** 
     * @property {number} statusCode - HTTP status code representing the error type.
     */
    this.statusCode = statusCode;

    /** 
     * @property {boolean} isOperational - Flag indicating whether the error is expected and handled.
     */
    this.isOperational = true;
  }
}

/**
 * Higher-order function to catch and handle asynchronous errors in Express middleware.
 * Wraps an asynchronous route handler and forwards any errors to the next middleware.
 * 
 * @param {Function} fn - An asynchronous function (controller) to be wrapped.
 * @returns {Function} - A middleware function that automatically catches errors.
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Middleware function to handle 404 Page Not Found errors.
 *
 * This function creates a new `BookifyError` with a message of 'Not found' and a status code of 404,
 * then passes it to the next middleware in the stack.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const pageNotFound = (req, res, next) => {
  next(new BookifyError('Not found', 404));
};

/**
 * Global error-handling middleware for Express.
 * 
 * This middleware catches errors thrown in the application and sends an appropriate response
 * to the client. It ensures that errors are handled gracefully without exposing sensitive details.
 * 
 * @param {Error} err - The error object, expected to contain a `statusCode` and `message`.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function.
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  res.render('error/centralizedError', { statusCode, message, ...getNavbarConfig('home') });
};

module.exports = { BookifyError, catchAsync, errorHandler, pageNotFound };