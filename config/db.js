const mongoose = require('mongoose');
const logger = require('../console/logger');
const { BookifyError } = require('../utils/errorHandler');

/**
 * Asynchronously connects to the MongoDB database using the connection string
 * provided in the environment variable `MONGO_URL`.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the database connection is successful.
 * @throws Will throw an error if the connection to the database fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    logger.success(`Database connected successfuly: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error connecting to database: ${err.message}`);
    throw new BookifyError(err.message);
  }
}

module.exports = connectDB;