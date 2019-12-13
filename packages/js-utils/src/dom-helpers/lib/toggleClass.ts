/**
 * toggles given class on given element
 * @param {Element} parent
 * @param {string} className
 * @param {boolean} add
 */
export const toggleClass = (element: Element, className: string, add?: boolean) => {
  element.classList.toggle(className, add)
};
