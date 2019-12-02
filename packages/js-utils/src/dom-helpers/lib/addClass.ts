function isIterable(elements: Element | Iterable<Element>): elements is Iterable<Element> {
  return Symbol.iterator in elements;
}

/**
 * adds given class to element
 * @param {Element | Iterable<Element>} elements
 * @param {...string} classNames
 */
export const addClass = (elements: Element | Iterable<Element>, ...classNames: string[]): void => {
  if (elements === undefined) {
    return;
  }

  if (isIterable(elements)) {
    for (const elem of elements) {
      addClass(elem, ...classNames);
    }
  } else {
    for (const className of classNames) {
      elements.classList.add(className);
    }
  }
};
