/**
 * merge two given arrays by the given checker function
 * @param {Array<any>} array1
 * @param {Array<any>} array2
 * @param {Function} checker - if this function returns true for a specific element combination the elements are getting merged
 * @returns {Array<any>}
 */
export const mergeArraysBy = <T>(
  array1: Array<T>,
  array2: Array<T>,
  checker: (a: T, b: Array<T>) => boolean
): Array<T> => {
  return array1.filter(element => checker(element, array2)).concat(array2);
};
