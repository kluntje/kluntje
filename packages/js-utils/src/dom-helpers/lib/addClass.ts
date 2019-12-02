/**
 * adds given class to element
 * @param {Element | NodeListOf<Element>} elements
 * @param {...string} classNames
 */
export const addClass = (elements: Element | NodeListOf<Element>, ...classNames: string[]): void => {
  if (elements === undefined) {
    return;
  }

  if (!(elements instanceof NodeList)) {
    for (const className of classNames) {
      elements.classList.add(className);
    }
  } else {
    elements.forEach(element => addClass(element, ...classNames));
  }
};
