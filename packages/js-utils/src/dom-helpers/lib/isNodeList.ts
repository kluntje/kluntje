
/**
 * checks, if target is NodeList
 * @param {*} target
 * @returns {boolean}
 */
export const isNodeList = (target: any): boolean => {
  // return NodeList.prototype.isPrototypeOf(target);
  // return target.length !== 0 && !(target.length === undefined);
  return !(target instanceof HTMLElement || target instanceof Window) ;
};
