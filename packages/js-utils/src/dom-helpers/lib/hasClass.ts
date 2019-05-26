
/**
 * returns if a specific element has given class
 * @param {HTMLElement} element
 * @param {string} className
 * @returns {boolean}
 */
export const hasClass = (element:HTMLElement|Element, className:string): boolean => {
  return element.classList.contains(className);
};
