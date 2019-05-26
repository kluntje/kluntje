
/**
 * removes specifiv Item from array, if found
 * @param {*} array
 * @param {*} deadItem
 * @returns {Array}
 */
export const removeItem = (array: any[], deadItem: any): any[] => {
  const index = array.findIndex(item => item === deadItem);
  if (index === -1) {
    return array;
  }

  array.splice(index, 1);

  return array;
};
