
/**
 * removes specific Item from array and return new array
 * @param {Array<any>} array
 * @param {any} itemToRemove
 * @returns {Array<any>}
 */
export const removeItem = <T>(array: Array<T>, itemToRemove: T): Array<T> => {
  return array.filter(item => item !== itemToRemove);
};
