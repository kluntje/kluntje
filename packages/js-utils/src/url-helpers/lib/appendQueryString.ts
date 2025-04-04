
/**
 * Appends query string to a given url
 * @param {string} url 
 * @param {string} queryString
 * @returns {string}
 * @example
 * const url = 'https://www.google.com';
 * const queryParam = 'q=hello';
 * const result = appendQueryString(url, queryParam);
 * console.log(result);
 * // => 'https://www.google.com?q=hello'
 */

export const appendQueryString = (url: string, queryString: string) => {
  if (queryString === "") return url;

  if (url.indexOf("?") === -1) {
    return `${url}?${queryString}`;
  }

  return `${url}&${queryString}`;
};
