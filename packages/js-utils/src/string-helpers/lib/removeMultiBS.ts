/**
 * removes multi Whitespaces in given string
 * @param {string} inputString
 * @returns {string}
 * @example
 * removeMultiBS('Hello My      World'); // Hello My World
 */
export const removeMultiBS = (inputString: string): string => {
  return inputString.replace(/ +(?= )/g, '');
};
