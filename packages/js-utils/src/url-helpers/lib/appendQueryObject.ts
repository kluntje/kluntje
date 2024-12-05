import { appendQueryParams } from "./appendQueryParams";
import { objectToSearchParams } from "./objectToSearchParams";


/**
 * Appends query object to a given url
 * @param {string} url 
 * @param {object} queryObject 
 * @returns {string}
 * @example
 * const url = 'https://www.google.com';
 * const queryObject = { q: 'hello', t: 'world' };
 * const result = appendQueryObject(url, queryObject);
 * console.log(result);
 * // => 'https://www.google.com?q=hello&t=world'
 */
export const appendQueryObject = (url: string, queryObject: Record<string, string>, prefix = "") => {
  const queryParams = objectToSearchParams(queryObject, prefix);
  return appendQueryParams(url, queryParams);
};
