/**
 * removes all Newlines in given string
 * @param {string} inputString
 * @returns {string}
 * @example
 * const article = find(document, 'aricle');
 * const textString = removeAllNL(article.innerText);
 */
export const removeAllNL = (inputString: string): string => {
  return inputString.replace(/\r?\n|\r/g, '');
};
