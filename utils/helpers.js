
const separateByComma = (arr) => {
  return arr.split(",").map(tag => tag.trim());
};

module.exports = { separateByComma };