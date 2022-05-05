/**
 * iterates over all nodes in a node list
 * (necessary because IE11 doesn't support .forEach  * for NodeLists)
 * @param {NodeListOf<T>} nodeList
 * @callback callback
 * @param {any} [context=window]
 * @example
 * const buttons = document.querySelectorAll('button');
 * forEachNode(buttons, (button, idx) => addClass(button, `my-button--${idx}`))
 */

 /**
 * @function callback
 * @param {Node} node
 * @param {Number} index
 * @param {NodeListOf<T>} nodeList
 */

export const forEachNode = <T extends Element = Element>(
  nodeList: NodeListOf<T>,
  callback: (node: T, index: number, nodeList: NodeListOf<T>) => any,
  context: any = window,
): void => {
  for (let i = 0; i < nodeList.length; i++) {
    callback.call(context, nodeList[i], i, nodeList);
  }
};
