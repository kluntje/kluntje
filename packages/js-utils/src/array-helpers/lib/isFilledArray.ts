
/**
 * checks, whether given Array exists, has at least one element
 * @param {Array<any>} array
 * @returns {boolean}
 */
export const isFilledArray = (array: Array<any>): boolean => {
  return array !== undefined &&
         array.length > 0;
};
