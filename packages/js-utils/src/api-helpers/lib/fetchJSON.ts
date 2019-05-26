
/**
 * Calls API and returns JSON as Promise
 * @param {string} url
 * @returns {Promise}
 */
export const fetchJSON = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response: any) => {
        if (!response.ok) {
          reject(response.statusText);
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch((error: any) => {
        console.error('Error:', error);
        reject(error);
      })
      .then((responseJSON: JSON) => {
        resolve(responseJSON);
      });
  });
};
