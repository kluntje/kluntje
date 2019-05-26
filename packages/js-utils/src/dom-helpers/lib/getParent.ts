
/**
 * returns parent of specific class, if found
 * @param {HTMLElement} element
 * @param {string} parentSelector
 * @returns {Element | null}
 */
export const getParent = (element:HTMLElement, parentSelector:string): Element | null => {
  return element.closest(parentSelector);
};
