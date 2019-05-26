
/**
 * pushes new Element to given array, if its not already in it
 * @param {*} array
 * @param {*} newElement
 * @returns {Array}
 */
export const pushIfNew = (array: any[], newElement: any): any[] => {
  if (array.findIndex((element: any) => element === newElement) === -1) {
    array.push(newElement);
  }
  return array;
};
