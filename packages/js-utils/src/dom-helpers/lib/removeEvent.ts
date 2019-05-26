import { isNodeList } from './isNodeList';
import { forEachNode } from './forEachNode';

/**
 * removes event with given parameters
 * @param {HTMLElement|Node|NodeList} target
 * @param {string} events
 * @param {Function} handler
 */
export const removeEvent = (
  target: any,
  events: string,
  handler: any,
  context: any,
) => {

  if (target === undefined
    || target === null
    || (isNodeList(target) && target.length === 0)) {
    console.warn('no target found');
    return;
  }

  if (isNodeList(target)) {
    forEachNode(
      target,
      (element: HTMLElement|Node) => {
        removeEvent(element, events, handler, context);
      },
      context,
    );
  }
  else {
    const eventList = events.trim().split(' ');
    eventList.forEach(event => {
      const key = getKey(target, event, handler, context);
      const newFunc = context.eventBindingMap[key];
      if (newFunc) { // can't add two listeners with exact same arguments
        delete context.eventBindingMap[key];
        target.removeEventListener(event, newFunc);
      }
    });
  }
};

function getKey(target: any, event: string, handler: any, context: any) {
  return `${getUID(target, context)}#
          ${event.trim()}#
          ${getUID(handler, context)}#
          ${getUID(context, context)}`
            .replace(/\n/gm, '')
            .replace(/\s/g, '');
}

function getUID(obj:any, context:any) {
  let uid;
  if (context.eventIdMap.has(obj)) {
    uid = context.eventIdMap.get(obj);
  }
  else {
    const newUid = 'xxxxxxxx'.replace(/x/g, replacer).toLowerCase();
    context.eventIdMap.set(obj, newUid);
    uid = newUid;
  }
  return uid;
}
function replacer() {
  return (Math.random() * 100 % 36 | 0).toString(36);
}
