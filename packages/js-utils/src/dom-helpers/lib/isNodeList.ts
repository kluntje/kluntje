
/**
 * checks, if target is NodeList
 * @param {*} target
 * @returns {boolean}
 */
export const isNodeList = (target: any): target is NodeListOf<Element> => {
  // TODO: check target instanceof NodeList
  return !(target instanceof HTMLElement || target instanceof Window);
};
