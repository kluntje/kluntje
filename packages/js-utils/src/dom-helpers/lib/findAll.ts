/**
 * returns all children of a specific parent matching the given selector
 * @param {Element | Document | null} parent
 * @param {string} selector
 * @returns {NodeListOf<Element>}
 */
export const findAll = <T extends Element = HTMLElement>(parent: Element | Document | null, selector: string): Array<T> => {
  if (parent === null) return [];
  if (!(parent instanceof Document) && parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return Array.from(parent.shadowRoot.querySelectorAll(selector));
  }
  return Array.from(parent.querySelectorAll(selector));
};
