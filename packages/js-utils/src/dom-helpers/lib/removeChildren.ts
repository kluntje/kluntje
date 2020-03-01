import { findAll } from './findAll';

/**
 * removes all children of a specific parent matching the given selector
 * @param {Element} parent
 * @param {string} selector
 * @example
 * const article = find('article);
 * removeChildren(article, '.ad');
 */
export const removeChildren = (parent: Element, selector: string): void => {
  const children = findAll(parent, selector);
  children.forEach(child => parent.removeChild(child));
};
