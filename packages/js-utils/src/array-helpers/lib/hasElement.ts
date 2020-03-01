
/**
 * checks, if element is in given array
 * @param {Array<T>} array
 * @param {T} element
 * @returns {boolean}
 * @example
 * const fruits = ["Banana", "Orange", "Apple", "Mango"];
 * 
 * if (hasElement(fruits, "Apple")) {
 *   console.log("You got an Apple");
 * }
 */
export const hasElement = <T>(array: Array<T>, element: T): boolean => {
  return array.findIndex(el => el === element) !== -1;
};
