/**
 * returns the argument wrapped in an array if it isn't array itself
 * @param {*} arg
 * @returns {Array}
 */
export const toArray = <T>(arg: T | Array<T>): Array<T> => {
  return Array.isArray(arg) ? arg : [arg];
};
