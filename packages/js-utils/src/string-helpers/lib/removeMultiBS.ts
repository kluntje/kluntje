
/**
 * removes multi Whitespaces in given string
 * @param {string} inputString
 * @returns {string}
 */
export const removeMultiBS = (inputString: string): string => {
  return inputString.replace(/ +(?= )/g, '');
};
