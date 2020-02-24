/**
 * adds given classes to one or multiple elements
 * @param {Element | Iterable<Element> | NodeListOf<Element> | null} elements
 * @param {...string} classNames
 */
export const addClass = (elements: Element | Iterable<Element> | NodeListOf<Element> | null, ...classNames: string[]): void => {
  if (elements === undefined || classNames.length === 0 || elements === null) {
    return;
  }

  if (elements instanceof Element) {
    elements = [elements];
  }

  if (elements instanceof NodeList) {
    elements = Array.from(elements);
  }

  for (const element of elements) {
    element.classList.add(...classNames);
  }
};
