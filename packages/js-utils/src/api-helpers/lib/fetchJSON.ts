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
export const fetchJSON = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return (await response.json()) as T;
};
