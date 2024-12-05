/**
 * Merge multiple URLSearchParams objects into a single URLSearchParams object.
 * @param {URLSearchParams[]} searchParams
 * @returns {URLSearchParams}
 * @example
 * const searchParams = [
 *  new URLSearchParams('q=hello'),
 *  new URLSearchParams('t=world')
 * ];
 * const result = combineSearchParams(searchParams);
 * console.log(result.toString());
 * // => 'q=hello&t=world'
 */
export const combineSearchParams = (searchParams: Array<URLSearchParams>): URLSearchParams => {
  const combinedSearchParams = new URLSearchParams();
  searchParams.forEach(searchParam => {
    searchParam.forEach((value, key) => {
      combinedSearchParams.append(key, value);
    });
  });

  return combinedSearchParams;
};
