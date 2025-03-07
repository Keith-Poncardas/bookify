const colors = require("colors");

class Logger {

  constructor() {
    this.logLevels = {
      success: { label: "SUCCESS", color: colors.green.underline },
      info: { label: "INFO", color: colors.blue },
      warn: { label: "WARN", color: colors.yellow },
      error: { label: "ERROR", color: colors.red.bold },
      debug: { label: "DEBUG", color: colors.magenta },
    };
  };

  /**
   * Formats a log message with a timestamp and log level.
   *
   * @param {string} level - The log level (e.g., 'info', 'error').
   * @param {string} message - The message to log.
   * @returns {string} The formatted log message.
   */
  #formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${colors.gray(timestamp)}] [${this.logLevels[level].color(this.logLevels[level].label)}] ${message}`;
  }

  /**
   * Logs a success message to the console.
   *
   * @param {string} message - The message to be logged.
   */
  success(message) {
    console.log(this.#formatMessage("success", message));
  }

  /**
   * Logs an informational message to the console.
   *
   * @param {string} message - The message to be logged.
   */
  info(message) {
    console.log(this.#formatMessage("info", message));
  }

  /**
   * Logs a warning message to the console.
   *
   * @param {string} message - The warning message to be logged.
   */
  warn(message) {
    console.warn(this.#formatMessage("warn", message));
  }

  /**
   * Logs an error message to the console.
   *
   * @param {string} message - The error message to be logged.
   */
  error(message) {
    console.error(this.#formatMessage("error", message));
  }

  /**
   * Logs a debug message to the console if the environment is not production.
   *
   * @param {string} message - The debug message to log.
   */
  debug(message) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.#formatMessage("debug", message));
    }
  }

};

const logger = new Logger();
module.exports = logger;