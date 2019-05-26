
/**
 * removes all Newlines in given string
 * @param {string} inputString
 * @returns {string}
 */
export const removeAllNL = (inputString: string): string => {
  return inputString.replace(/\r?\n|\r/g, '');
};
