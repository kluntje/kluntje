
/**
 * returns all children of a specific parent matching the given selector
 * @param {HTMLElement} parent
 * @param {string} selector
 * @returns {NodeList}
 */
export const findAll = (parent: HTMLElement, selector: string): NodeList => {
  if (parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelectorAll(selector);
  }
  return parent.querySelectorAll(selector);
};
