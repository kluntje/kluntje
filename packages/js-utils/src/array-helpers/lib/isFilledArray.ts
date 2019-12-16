
/**
 * checks, whether given Array exists, has at least one element
 * @param {Array<any>} array
 * @returns {boolean}
 */
export const isFilledArray = <T>(array: Array<T>): boolean => {
  return array !== undefined && array.length > 0;
};
