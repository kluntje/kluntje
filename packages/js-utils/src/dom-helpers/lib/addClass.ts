
/**
 * adds given class to element
 * @param {HTMLElement | NodeList} elements
 * @param {string} className
 */
export const addClass = (elements:any, className:string): void => {
  if (elements === undefined) {
    return;
  }

  if (elements.length === undefined) {
    elements.classList.add(className);
  }
  else {
    elements.forEach((element: HTMLElement) => {
      addClass(element, className);
    });
  }
};
