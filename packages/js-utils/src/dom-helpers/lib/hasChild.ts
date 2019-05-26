
/**
 * returns if a specific parent has a child matching the given selector
 * @param {HTMLElement} parent
 * @param {string} childSelector
 * @returns {boolean}
 */
export const hasChild = (parent:HTMLElement, childSelector:string): boolean => {
  if (parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelectorAll(childSelector).length !== 0;
  }
  return parent.querySelectorAll(childSelector).length !== 0;
};
