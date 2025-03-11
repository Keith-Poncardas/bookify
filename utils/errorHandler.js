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

module.exports = { BookifyError, catchAsync, errorHandler };