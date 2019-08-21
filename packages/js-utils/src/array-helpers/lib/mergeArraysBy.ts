/**
 * merge two given arrays by the given checker Funktion
 * @param {Array<any>} array1
 * @param {Array<any>} array2
 * @param {Funktion} checker - if this Funktion returns true for a specific element combination the Elements are getting merged
 * @returns {Array<any>}
 */
export const mergeArraysBy = (array1: Array<any>, array2: Array<any>, checker: Function): Array<any> => {
  return array1
    .filter(element => checker(element, array2))
    .concat(array2);
};
