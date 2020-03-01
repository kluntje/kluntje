
/**
 * returns if a specific element has given class
 * @param {Element} element
 * @param {string} className
 * @returns {boolean}
 * @example
 * const cta = document.querySelector('button');
 * if (hasClass(cta, 'primary')) console.log("primary")
 */
export const hasClass = (element: Element, className: string): boolean => {
  return element.classList.contains(className);
};
