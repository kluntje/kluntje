
/**
 * returns innerText of given Element
 * @param {HTMLElement} el
 * @returns {string}
 */
export const getInnerText = (el: HTMLElement): string => {
  return el.innerText || el.textContent || '';
};
