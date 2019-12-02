/**
 * adds given classes to one or multiple elements
 * @param {Element | Iterable<Element>} elements
 * @param {...string} classNames
 */
export const addClass = (elements: Element | Iterable<Element>, ...classNames: string[]): void => {
  if (elements === undefined || classNames.length === 0) {
    return;
  }

  if (elements instanceof Element) {
    elements = [elements];
  }

  for (const elem of elements) {
    elem.classList.add(...classNames);
  }
};
