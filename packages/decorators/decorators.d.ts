declare type DecoratorEventDefinition<T> = {
    handler: keyof T;
    eventName: string;
};
export declare type DecoratorUiDefinition<T> = {
    selector: string;
    justOne: boolean;
    events: Set<DecoratorEventDefinition<T>>;
};
export declare function uiElement(selector: string): (component: any, propertyName: string) => void;
export declare function uiElements(selector: string): (component: any, propertyName: string) => void;
export declare function uiEvent<T>(elementName: keyof T | "window" | "this", eventName: string): (component: any, handlerName: string) => void;
export {};
