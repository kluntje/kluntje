import { Context } from "./Context";

/**
 * iterates over all nodes in a node list
 * (necessary because IE11 doesn't support .forEach  * for NodeLists)
 * @param {NodeListOf<T>} nodeList
 * @callback callback
 * @param {Context} [context]
 * @example
 * const buttons = document.querySelectorAll('button');
 * forEachNode(buttons, (button, idx) => addClass(button, `my-button--${idx}`))
 */

 /**
 * @function callback
 * @param {Node} node
 * @param {Number} index
 * @return any
 */

export const forEachNode = <T extends Element = Element>(
  nodeList: NodeListOf<T>,
  callback: (node: T, index: number) => any,
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
