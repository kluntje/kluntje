
/**
 * checks, whether given Array exists and has at least one element
 * @param {Array<T>} array
 * @returns {boolean}
 * @example
 * const myBooks = await fetchJSON("https://my-book-store.api/books");
 * if (isFilledArray(myBooks)) {
 *   console.log(`${myBooks.length} Books found!`)
 * } else {
 *   console.log("Sorry, no Books found");
 * }
 */
export const isFilledArray = <T>(array: Array<T>): boolean => {
  return array !== undefined && array.length > 0;
};
