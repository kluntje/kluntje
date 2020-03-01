/**
 * returns stringified value for the given argument
 * @param {*} arg
 * @returns {string}
 * @example
 * const submitData = toString(formData);
 */
export const toString = (arg: any): string => {
  if (typeof arg === 'object' && arg !== null) {
    return JSON.stringify(arg);
  }
  return String(arg);
};
