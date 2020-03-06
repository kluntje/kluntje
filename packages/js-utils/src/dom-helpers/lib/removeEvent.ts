import { EventTarget, EventHandler, getKey } from './onEvent';
import { isIterable, hasElements } from './iterable';
import { Context } from './Context';

/**
 * removes event with given parameters
 * @param {HTMLElement|Iterable<HTMLElement>} target
 * @param {string | Array<string>} events
 * @param {Function} handler
 * @param {Context} context
 * @example
 * const buttons = findAll(document, 'button);
 * removeEvent(buttons, 'click', () => console.log('button clicked'), this);
 */
export const removeEvent = <T extends Event = Event>(
  target: EventTarget | null,
  events: string | Array<string>,
  handler: EventHandler<T>,
  context: Context,
) => {
  if (target === undefined
    || target === null
    || (isIterable(target) && !hasElements(target))) {
    console.warn('no target found');
    return;
  }

  if (isIterable<HTMLElement>(target) && !(target instanceof HTMLElement)) {
    for (const element of target) {
      removeEvent(element, events, handler, context);
    }
    return;
  }

  let eventList: Array<string>;

  if (typeof events === 'string') {
    eventList = events.trim().split(' ');
  } else {
    eventList = events;
  }

  eventList.forEach(event => {
    const key = getKey(target, event, handler, context);
    const newFunc = context.eventBindingMap[key];
    if (newFunc) { // can't add two listeners with exact same arguments
      delete context.eventBindingMap[key];
      target.removeEventListener(event, newFunc);
    }
  });
};
