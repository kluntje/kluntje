
/**
 * removes given class from element
 * @param {Element|Iterable<Element>} elements
 * @param {...string} classNames
 */
export const removeClass = (elements: Element | Iterable<Element>, ...classNames: string[]): void => {
  if (elements === undefined || classNames.length === 0) {
    return;
  }

  if (elements instanceof Element) {
    elements = [elements];
  }

  for (const element of elements) {
    element.classList.remove(...classNames);
  }
};
