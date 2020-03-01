
/**
 * returns the first child of a specific parent matching the given selector
 * @param {Element | Document | null} parent
 * @param {string} selector
 * @returns {Element | null}
 * @example
 * const input = find(document, 'input');
 */
export const find = <T extends Element = HTMLElement>(parent: Element | Document | null, selector: string): T | null => {
  if (parent === null) return null;
  if (!(parent instanceof Document) && parent.shadowRoot !== null && parent.shadowRoot !== undefined) {
    return parent.shadowRoot.querySelector<T>(selector);
  }

  return parent.querySelector<T>(selector);
};
