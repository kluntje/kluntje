
/**
 * compare two arguments, for object their toString values are compared
 * @param {*} arg1
 * @param {*} arg2
 * @returns {boolean}
 */
export const mergeArray = (array1: any[], array2: any[], checker: Function): any[] => {
  return array1
    .filter(element => {
      if (checker(element, array2)) return element;
    })
    .concat(array2);
};
