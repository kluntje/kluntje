
/**
 * removes given class from element
 * @param {Element | Iterable<Element> | NodeListOf<Element> | null} elements
 * @param {...string} classNames
 * @example
 * const button = document.querySelector('.button');
 * removeClass(button, 'active');
 * @example
 * const inputs = document.querySelectorAll('input');
 * removeClass(inputs, 'active');
 */
export const removeClass = (elements: Element | Iterable<Element> | NodeListOf<Element> | null, ...classNames: string[]): void => {
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
    element.classList.remove(...classNames);
  }
};
