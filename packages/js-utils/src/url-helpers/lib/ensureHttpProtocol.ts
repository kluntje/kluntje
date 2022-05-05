/**
 * Ensures that the given url has an http protocol. If the url does not have an http protocol, it will be prepended with https://. If the url already has an http protocol, it will be returned as is. If the protocol should be http instead of https, you can pass in the optional parameter `useHttp` as true.
 * @param {string} url 
 * @param {boolean} useHttp 
 * @returns {string}
 * @example
 * const url = 'https://www.google.com';
 * const result = ensureHttpProtocol(url);
 * console.log(result);
 * // => 'https://www.google.com'
 * 
 * const url = 'www.google.com';
 * const result = ensureHttpProtocol(url);
 * console.log(result);
 * // => 'https://www.google.com'
 * 
 * const url = 'http://www.google.com';
 * const result = ensureHttpProtocol(url);
 * console.log(result);
 * // => 'http://www.google.com'
 * 
 */

export const ensureHttpProtocol = (url: string, useHttp = false): string => {
  if (url.startsWith("https://") || url.startsWith("http://")) return url;
  return `http${useHttp ? "" : "s"}://${url}`;
};
