
/**
 * returns if a specific element has given class
 * @param {Element} element
 * @param {string} className
 * @returns {boolean}
 */
export const hasClass = (element: Element, className: string): boolean => {
  return element.classList.contains(className);
};
