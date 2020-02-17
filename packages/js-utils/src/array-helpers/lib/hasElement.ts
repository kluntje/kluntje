
/**
 * checks, if element is in given array
 * @param {*[]} array
 * @param {*} element
 * @returns {boolean}
 */
export const hasElement = <T>(array: Array<T>, element: T): boolean => {
  return array.findIndex(el => el === element) !== -1;
};
