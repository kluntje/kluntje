/**
 * returns stringified value for the given argument
 * @param {*} arg
 * @returns {string}
 */
export const toString = (arg: any): string => {
  if (typeof arg === 'object' && arg !== null) {
    return JSON.stringify(arg);
  }
  return String(arg);
};
