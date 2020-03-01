/**
 * returns number of words in a given text
 * @param {string} text
 * @returns {number}
 * @example
 * const article = find(document, 'aricle');
 * const articleWords = getWordCount(article.innerText);
 */
export const getWordCount = (text: string): number => {
  return text.split(' ').length;
};
