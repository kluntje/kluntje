export interface Context {
  eventBindingMap: {
    [index: string]: EventListenerOrEventListenerObject
  };
  eventIdMap: WeakMap<HTMLElement | Function, string>;
}
