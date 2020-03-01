/**
 * removes all Whitespaces in given string
 * @param {string} inputString
 * @returns {string}
 * @example
 * removeAllBS('Hello My  World  '); // HelloMyWorld
 */
export const removeAllBS = (inputString: string): string => {
  return inputString.replace(/\s/g, '');
};
