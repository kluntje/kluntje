import { isIterable, hasElements } from './iterable';
import { Context } from './Context';

export type EventTarget = HTMLElement | Iterable<HTMLElement> | Window;

export type EventHandler<T> = (e: T) => void;

/**
 * adds event with given parameters
 * @param {EventTarget | null} target
 * @param {string | Array<string>} events
 * @param {Function} handler
 * @param {Context} context
 * @example
 * const buttons = findAll(document, 'button);
 * onEvent(buttons, 'click', () => console.log('button clicked'), this);
 */
export const onEvent = <T extends Event = Event>(
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
      onEvent(element, events, handler, context);
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
    if (!context.eventBindingMap[key]) { // can't add two listeners with exact same arguments
      const newFunc = handler.bind(context) as EventListener;
      context.eventBindingMap[key] = newFunc;
      return target.addEventListener(event.trim(), newFunc);
    }
  });
};

export function getKey<T extends Event = Event>(
  target: EventTarget,
  event: string,
  handler: EventHandler<T>,
  context: any
): string {
  return `${getUID(target, context)}#
          ${event.trim()}#
          ${getUID(handler, context)}#
          ${getUID(context, context)}`
    .replace(/\n/gm, "")
    .replace(/\s/g, "");
}

function getUID(obj: any, context: any): string {
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

function replacer(): string {
  return (Math.random() * 100 % 36 | 0).toString(36);
}
