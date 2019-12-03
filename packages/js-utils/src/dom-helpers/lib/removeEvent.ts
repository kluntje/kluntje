import { EventTarget, EventHandler, getKey } from './onEvent';
import { isIterable, hasElements } from './iterable';

/**
 * removes event with given parameters
 * @param {HTMLElement|Iterable<HTMLElement>} target
 * @param {string} events
 * @param {Function} handler
 */
export const removeEvent = <T extends Event = Event>(
  target: EventTarget,
  events: string,
  handler: EventHandler<T>,
  context: any,
) => {
  if (target === undefined
    || target === null
    || (isIterable(target) && !hasElements(target))) {
    console.warn('no target found');
    return;
  }

  if (isIterable(target)) {
    for (const element of target) {
      removeEvent(element, events, handler, context);
    }
  } else {
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
