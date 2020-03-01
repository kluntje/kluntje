/**
 * waits for given event for a (optional) max-timeout
 * @param {HTMLElement} target
 * @param {string} eventName
 * @param {number} timeout - timeout in milliseconds
 * @returns {Promise<void>}
 * @example
 * addClass(button, 'animate');
 * waitForEvent(button, 'transitionend', 500).then(() => removeClass(button, 'animate'));
 * @example
 * addClass(button, 'animate');
 * await waitForEvent(button, 'transitionend', 500);
 * removeClass(button, 'animate');
 */
export const waitForEvent = async (target: HTMLElement, eventName: string, timeout?: number): Promise<void> => {
  return new Promise(resolve => {
    if (timeout !== undefined) {
      setTimeout(() => resolve(), timeout);
    }
    target.addEventListener(eventName, () => resolve());
  });
};
