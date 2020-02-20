import { Context } from "./Context";

/**
 * iterates over all nodes in a node list
 * (necessary because IE11 doesn't support .forEach  * for NodeLists)
 * @param {*} target
 * @returns {boolean}
 */
export const forEachNode = <T extends Element = Element>(
  nodeList: NodeListOf<T>,
  callback: (node: Node, index: number) => any,
  context?: Context
): void => {
  for (let i = 0; i < nodeList.length; i++) {
    if(!context) {
      callback.call(null, nodeList[i], i);
    } else {
      callback.call(context, nodeList[i], i);
    }
  }
};
