
/**
 * returns innerText of given Element
 * @param {HTMLElement} el
 * @returns {string}
 */
export const getInnerText = (el: any): string => {
  return el.innerText || el.textContent || '';
};
