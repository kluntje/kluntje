import { hasElement } from '../../array-helpers';

/**
 * pushes new Element to given array, if its not already in it
 * @param {Array<T>} array
 * @param {T} newElement
 * @returns {Array<T>}
 * @example
 * const fruitStore = ["Banana", "Orange", "Apple", "Mango"];
 * const newFruit = getInputValue(...)
 * const newFruitStore = pushIfNew(fruitStore, newFruit);
 */
export const pushIfNew = <T>(array: Array<T>, newElement: T): Array<T> => {
  if (!hasElement(array, newElement)) {
    array.push(newElement);
  }
  return array;
};
