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
  return new Promise((resolve, reject) => {
    fetch(url, options)
          .then(response => {
            // client/server error 4xx, 5xx
            if (!response.ok) {
              reject(response);
              return;
            }
            resolve(response.json() as Promise<T>);
          })
          // (and) network error e.g. user is offline
          .catch(err => reject(err));
  });
};

