
/**
 * returns innerText of given Element
 * @param {HTMLElement} el
 * @returns {string}
 * @example
 * const myArticle = document.querySelector('article');
 * const articleText = getInnerText(myArticle);
 */
export const getInnerText = (el: HTMLElement): string => {
  return el.innerText || el.textContent || '';
};
