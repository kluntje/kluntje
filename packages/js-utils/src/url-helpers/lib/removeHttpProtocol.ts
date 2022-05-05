/**
 * returns a string without the http or https protocol
 * @param {string} url 
 * @returns {string}
 * @example
 * const url = 'https://www.google.com';
 * const result = removeHttpProtocol(url);
 * console.log(result);
 * // => 'www.google.com'
 */
export const removeHttpProtocol = (url: string): string => {
  if (url.startsWith("https://")) return url.substring(8);
  if (url.startsWith("http://")) return url.substring(7);
  return url;
}