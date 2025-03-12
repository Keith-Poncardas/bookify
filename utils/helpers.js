
/**
 * Splits a string by commas and trims whitespace from each resulting element.
 *
 * @param {string} arr - The string to be split by commas.
 * @returns {string[]} An array of trimmed strings.
 */
const separateByComma = (arr) => {
  return arr.split(",").map(tag => tag.trim());
};

module.exports = { separateByComma };