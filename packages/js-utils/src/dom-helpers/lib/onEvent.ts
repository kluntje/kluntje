import { isNodeList } from './isNodeList';
import { forEachNode } from './forEachNode';

/**
 * adds event with given parameters
 * @param {HTMLElement|Node|NodeList} target
 * @param {string} events
 * @param {Function} handler
 */
export const onEvent = (
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
        onEvent(element, events, handler, context);
      },
      context,
    );
    // target.forEach((element: HTMLElement|Node) => {
    //   onEvent(element, events, handler, context);
    // });
  }
  else {
    const eventList = events.trim().split(' ');
    eventList.forEach(event => {
      const key = getKey(target, event, handler, context);
      if (!context.eventBindingMap[key]) { // can't add two listeners with exact same arguments
        const newFunc = handler.bind(context);
        context.eventBindingMap[key] = newFunc;
        return target.addEventListener(event.trim(), newFunc);
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
