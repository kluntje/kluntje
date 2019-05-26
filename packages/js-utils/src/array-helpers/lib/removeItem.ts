
/**
 * removes specific Item from array and return new array
 * @param {Array<any>} array
 * @param {any} itemToRemove
 * @returns {Array<any>}
 */
export const removeItem = (array: Array<any>, itemToRemove: any): Array<any> => {
  return array.filter(item => item !== itemToRemove);
};
