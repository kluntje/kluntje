
/**
 * returns parent of specific class, if found
 * @param {Element} element
 * @param {string} parentSelector
 * @returns {Element | null}
 * @example
 * const myText = document.querySelector('p');
 * const myArticle = getParent(myText, 'article');
 */
export const getParent = <T extends Element = Element>(element: Element, parentSelector: string): T | null => {
  return element.closest<T>(parentSelector);
};
