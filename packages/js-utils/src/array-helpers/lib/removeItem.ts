
/**
 * removes specific Item from array and return new array
 * @param {Array<T>} array
 * @param {T} itemToRemove
 * @returns {Array<T>}
 * @example
 * const fruitStore = ["Banana", "Orange", "Apple", "Mango"];
 * const newFruitStore = removeItem(fruitStore, "Apple"); // ["Banana", "Orange", "Mango"]
 */
export const removeItem = <T>(array: Array<T>, itemToRemove: T): Array<T> => {
  return array.filter(item => item !== itemToRemove);
};
