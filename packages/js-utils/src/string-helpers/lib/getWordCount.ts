
/**
 * returns number of words in a given text
 * @param {string} text
 * @returns {number}
 */
export const getWordCount = (text: string): number => {
  return text.split(' ').length;
};
