import { removeClass, addClass, hasClass } from '../index';

/**
 * toggles given class on given element
 * @param {HTMLElement} parent
 * @param {string} className
 * @param {boolean} add
 */
export const toggleClass = (element:HTMLElement|Element, className:string, add?:boolean) => {
  if (typeof add !== 'undefined') {
    if (add) {
      addClass(element, className);
    }
    else {
      removeClass(element, className);
    }
  }
  else {
    toggleClass(element, className, !hasClass(element, className));
  }
};
