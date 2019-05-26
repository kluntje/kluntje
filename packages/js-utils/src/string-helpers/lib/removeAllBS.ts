
/**
 * removes all Whitespaces in given string
 * @param {string} inputString
 * @returns {string}
 */
export const removeAllBS = (inputString: string): string => {
  return inputString.replace(/\s/g, '');
};
