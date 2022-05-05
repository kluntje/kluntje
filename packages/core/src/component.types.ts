import { PropDefinition } from './decorators/prop';

export type ComponentUiElementDefinitions = Record<string, string>;
export type ComponentUiElement<T extends HTMLElement = any> = T | Array<T>;
export type ComponentUiElements = Record<string, ComponentUiElement>;
export interface ComponentEvent<T = any> {
  event: string;
  target: string;
  handler: keyof T;
  options?: AddEventListenerOptions;
}

export type ComponentStates = Record<string, any>;

export type ComponentReactions<T = any> = Record<string, Array<Function | keyof T>>;

export type ComponentProps<T> = Record<string, PropDefinition<T>>;
