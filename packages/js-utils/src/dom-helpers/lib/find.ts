
/**
 * returns the first child of a specific parent matching the given selector
 * @param {HTMLElement} parent
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
export const find = (parent: HTMLElement, selector: string): HTMLElement | null => {
  if (parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelector(selector);
  }
  return parent.querySelector(selector);
};
