/**
 *
 * @param {string} requestedPage
 *  @returns {string}
 */
const capitalize = (str) => {
  // Split the string into an array of words
  const words = str.split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });

  // Join the capitalized words back into a string
  const capitalizedStr = capitalizedWords.join(' ');

  return capitalizedStr;
};

module.exports = capitalize;
