
/**
 * checks, if element is in given array
 * @param {*} array
 * @param {*} element
 * @returns {boolean}
 */
export const hasElement = (array: any[], element: any): boolean => {
  return array.findIndex((el: any) => el === element) !== -1;
};
