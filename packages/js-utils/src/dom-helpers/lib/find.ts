
/**
 * returns the first child of a specific parent matching the given selector
 * @param {Element|Document} parent
 * @param {string} selector
 * @returns {Element | null}
 */
export const find = <T extends Element = Element>(parent: Element | Document, selector: string): T | null => {
  if (!(parent instanceof Document) && parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelector<T>(selector);
  }

  return parent.querySelector<T>(selector);
};
