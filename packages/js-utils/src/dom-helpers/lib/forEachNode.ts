
/**
 * iterates over all Nodes of a Nodelist
 * (nessesarry because IE11 doesn't support .forEach  * for NodeLists)
 * @param {*} target
 * @returns {boolean}
 */
export const forEachNode = (nodeList: NodeList, callback: Function, context: any): void => {
  for (let i = 0; i < nodeList.length; i++) {
    callback.call(context, nodeList[i], i);
  }
};
