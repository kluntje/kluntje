import { findAll } from './findAll';

/**
 * removes all children of a specific parent matching the given selector
 * @param {HTMLElement} parent
 * @param {string} selector
 * @returns {NodeList}
 */
export const removeChilds = (parent: HTMLElement, selector: string): void => {
  const childs = findAll(parent, selector);
  childs.forEach((child: Node) => {
    parent.removeChild(child);
  });
};
