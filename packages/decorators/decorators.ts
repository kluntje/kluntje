type DecoratorEventDefinition<T> = {
  handler: keyof T;
  eventName: string;
};

export type DecoratorUiDefinition<T> = {
  selector: string;
  justOne: boolean;
  events: Set<DecoratorEventDefinition<T>>;
};

export function uiElement(selector: string) {
  return function decorator(component: any, propertyName: string) {
    if (component.decoratedUiEls === undefined) {
      component.decoratedUiEls = new Map();
    }

    component.decoratedUiEls.set(propertyName, {
      selector,
      justOne: true,
      events: new Set(),
    });
  };
}

export function uiElements(selector: string) {
  return function decorator(component: any, propertyName: string) {
    if (component.decoratedUiEls === undefined) {
      component.decoratedUiEls = new Map();
    }

    component.decoratedUiEls.set(propertyName, {
      selector,
      justOne: false,
      events: new Set(),
    });
  };
}

export function uiEvent<T>(elementName: keyof T | "window" | "this", eventName: string) {
  return function decorator(component: any, handlerName: string) {
    if (component.decoratedUiEls === undefined) component.decoratedUiEls = new Map();

    const curUiElement = component.decoratedUiEls.get(elementName);

    if (curUiElement === undefined && (elementName === "window" || elementName === "this")) {
      component.decoratedUiEls.set(elementName.toString(), {
        selector: elementName,
        justOne: true,
        events: new Set([{ eventName, handler: handlerName }]),
      });
    } else {
      curUiElement.events.add({
        eventName,
        handler: handlerName,
      });
      component.decoratedUiEls.set(elementName, curUiElement);
    }
  };
}
