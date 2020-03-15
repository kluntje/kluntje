/**
 * Calls API and returns JSON as Promise
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<T>}
 * @example
 * // use with async/await
 * const myApiResponse = await fetchJSON("https://some.api/path")
 * @example
 * // use as normal promise
 * fetchJSON("https://some.api/path").then((data) => console.log("myData:", data));
 */
export const fetchJSON = <T = any>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options)
          .then(response => (response.json() as Promise<T>));
};

