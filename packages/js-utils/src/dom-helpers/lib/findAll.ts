/**
 * returns all children of a specific parent matching the given selector
 * @param {Element|Document} parent
 * @param {string} selector
 * @returns {NodeListOf<Element>}
 */
export const findAll = (parent: Element | Document, selector: string): NodeListOf<Element> => {
  if (!(parent instanceof Document) && parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelectorAll(selector);
  }
  return parent.querySelectorAll(selector);
};
