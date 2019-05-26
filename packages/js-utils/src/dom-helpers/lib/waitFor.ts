/**
 * waits for given timout
 * @param {number} timeout - timeout in milliseconds
 * @returns {Promise<void>}
 */
export const waitFor = (timeout: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve();
      },
      timeout,
    );
  });
};
