import { appendQueryString } from "./appendQueryString";

/**
 * Appends URLSearchParams to a given url
 * @param {string} url 
 * @param {URLSearchParams} queryParams 
 * @returns {string}
 * @example
 * const url = 'https://www.google.com';
 * const queryParams = new URLSearchParams({ q: 'hello', t: 'world' });
 * const result = appendQueryParams(url, queryParams);
 * console.log(result);
 * // => 'https://www.google.com?q=hello&t=world'
 */
export const appendQueryParams = (url: string, queryParams: URLSearchParams) => {
  return appendQueryString(url, queryParams.toString());
};
