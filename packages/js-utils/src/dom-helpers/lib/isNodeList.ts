
/**
 * checks, if target is NodeList
 * @param {any} target
 * @returns {boolean}
 */
export const isNodeList = (target: any): target is NodeListOf<Element> => {
  // TODO: check target instanceof NodeList
  return !(target instanceof HTMLElement || target instanceof Window);
};
