/**
 * resolves Promise after given timeout
 * @param {number} timeout - timeout in milliseconds
 * @returns {Promise<void>}
 * @example
 * addClass(button, 'animate');
 * waitFor(300).then(() => removeClass(button, 'animate'));
 * @example
 * addClass(button, 'animate');
 * await waitFor(300);
 * removeClass(button, 'animate');
 */
export const waitFor = (timeout: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  });
};
