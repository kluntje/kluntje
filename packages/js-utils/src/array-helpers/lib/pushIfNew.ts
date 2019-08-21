import { hasElement } from '..';

/**
 * pushes new Element to given array, if its not already in it
 * @param {Array<any>} array
 * @param {any} newElement
 * @returns {Array<any>}
 */
export const pushIfNew = (array: Array<any>, newElement: any): Array<any> => {
  if (!hasElement(array, newElement)) {
    array.push(newElement);
  }
  return array;
};
