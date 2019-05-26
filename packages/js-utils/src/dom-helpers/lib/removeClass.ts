
/**
 * removes given class from element
 * @param {HTMLElement|NodeList} element
 * @param {string} className
 */
export const removeClass = (elements:any, className:string): void => {
  if (elements === undefined) {
    return;
  }

  if (elements.length === undefined) {
    elements.classList.remove(className);
  }
  else {
    elements.forEach((element: HTMLElement) => {
      removeClass(element, className);
    });
  }
};
