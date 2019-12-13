
/**
 * returns parent of specific class, if found
 * @param {Element} element
 * @param {string} parentSelector
 * @returns {Element | null}
 */
export const getParent = <T extends Element = Element>(element: Element, parentSelector: string): T | null => {
  return element.closest<T>(parentSelector);
};
