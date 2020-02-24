import { hasClass } from "./hasClass";
import { addClass } from "./addClass";
import { removeClass } from "./removeClass";

/**
 * toggles given class on given element
 * @param {Element | Iterable<Element> | NodeListOf<Element>} elements
 * @param {string} className
 * @param {boolean} add
 */
export const toggleClass = (elements: Element | Iterable<Element> | NodeListOf<Element> | null, className: string, add?: boolean): void => {
  if (elements === undefined || elements === null) {
    return;
  }

  if (elements instanceof Element) {
    elements = [elements];
  }

  if (elements instanceof NodeList) {
    elements = Array.from(elements);
  }

  for (const element of elements) {
    if (add === true) {
      addClass(element, className);
    }
    else if (hasClass(element, className) || add === false) {
      removeClass(element, className);
    }
    else {
      addClass(element, className);
    }
  }
};
