
/**
 * returns if a specific parent has a child matching the given selector
 * @param {Element} parent
 * @param {string} childSelector
 * @returns {boolean}
 */
export const hasChild = (parent: Element, childSelector: string): boolean => {
  if (parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelector(childSelector) !== null;
  }
  return parent.querySelector(childSelector) !== null;
};
