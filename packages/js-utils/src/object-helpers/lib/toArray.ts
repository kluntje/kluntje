/**
 * returns the argument wrapped in an array if it isn't array itself
 * @param {*} arg
 * @returns {Array}
 */
export const toArray = (arg:any): any[] => {
  return Array.isArray(arg) ? arg : [arg];
};
