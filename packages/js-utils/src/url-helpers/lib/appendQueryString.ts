
/**
 * Appends query string to a given url
 * @param {string} url 
 * @param {string} queryParam
 * @returns {string}
 * @example
 * const url = 'https://www.google.com';
 * const queryParam = 'q=hello';
 * const result = appendQueryString(url, queryParam);
 * console.log(result);
 * // => 'https://www.google.com?q=hello'
 */

export const appendQueryString = (url: string, queryParam: string) => {
  if (url.indexOf("?") === -1) {
    return `${url}?${queryParam}`;
  }

  return `${url}&${queryParam}`;
};
