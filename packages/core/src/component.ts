import { naiveClone, isEqual, getValue, toArray } from '@kluntje/js-utils/lib/object-helpers';
import { mergeArraysBy } from '@kluntje/js-utils/lib/array-helpers';
import { onEvent, removeEvent, waitForEvent, find, findAll } from '@kluntje/js-utils/lib/dom-helpers';
import { toKebabCase } from '@kluntje/js-utils/lib/string-helpers';

import { DecoratorUiDefinition } from './decorators';
import { decoratedProps, DEFAULT_PROP_DECORATOR_OPTIONS, propDefinitionKeys } from './decorators/prop';
// eslint-disable-next-line prettier/prettier
import type { PropDefinition, PropCastTypes } from './decorators/prop';
import {
  ComponentUiElementDefinitions,
  ComponentEvent,
  ComponentStates,
  ComponentReactions,
  ComponentUiElements,
  ComponentProps,
} from './component.types';

export { uiElement, uiElements, uiEvent, MQBasedRendered, prop, tag } from './decorators';

export const INITIALIZED_EVENT = 'kl-component-initialized';

export interface ComponentArgs {
  ui?: ComponentUiElementDefinitions;
  events?: ComponentEvent[];
  initialStates?: ComponentStates;
  reactions?: ComponentReactions;
  props?: Record<string, undefined | null | string | boolean | number | object | PropDefinition>;
  useShadowDOM?: boolean;
  preserveChildren?: boolean;
  asyncRendering?: boolean;
}

export class Component extends HTMLElement {
  protected uiDefinitions: ComponentUiElementDefinitions = {};
  protected ui: ComponentUiElements = {};
  private events: Array<ComponentEvent<this>> = [];
  private useShadowDOM: boolean;
  private preserveChildren: boolean;
  private asyncRendering: boolean;
  protected reactions: ComponentReactions<this> = {
    initialized: ['onComponentInitialized'],
  };

  private _state = {};
  private _initialStates = {};

  eventIdMap: WeakMap<HTMLElement | Function, string> = new WeakMap();
  eventBindingMap: Record<string, EventListenerOrEventListenerObject> = {};

  [decoratedProps]?: Record<string, PropDefinition>;
  // stores prop definition passed in the constructor options or as decorators
  props: ComponentProps<this>;

  constructor({
    ui = {},
    events = [],
    initialStates = {},
    reactions = {},
    props = {},
    useShadowDOM = false,
    preserveChildren = false,
    asyncRendering = false,
  }: ComponentArgs = {}) {
    super();

    this.initialStates = {
      initialized: false,
    };

    this.useShadowDOM = useShadowDOM;
    this.preserveChildren = preserveChildren;
    this.asyncRendering = asyncRendering;

    // initialize shadowDOM if needed
    if (this.useShadowDOM) {
      this.attachShadow({ mode: 'open' });
    }

    Object.assign(this.uiDefinitions, ui);

    Object.assign(this.initialStates, initialStates);
    Object.assign(this.reactions, reactions);

    this.addReactions(reactions);

    this.mergeEvents(events);
    this.props = this.normalizeProps({ ...(this[decoratedProps] || null), ...props });
  }

  /* ====================================================
                    Lifcycle-Hooks
    ==================================================*/

  /**
   * On Web-Components-Lifcycle-Hook add own Lifcycle-Hooks
   * and generate global properties
   */
  public connectedCallback(): void {
    this.setupComponent();
  }

  /**
   * Lifecycle-Hook, triggered before componentProps get destroyed
   */
  public beforeComponentDisconnects(): void {
    // can be overridden
  }

  /**
   * Lifecycle-Hook, needed to destroy Component on non active MQs
   */
  public disconnectComponent(): void {
    this.beforeComponentDisconnects();
    this.destroyComponentProps();
    this.destroyComponent();
    this.setState({ initialized: false });
  }

  /**
   * Overrideable rendering Template getter
   * @returns {string | null | HTMLTemplateElement} rendering template for component
   */
  public renderingTemplate(): string | null | HTMLTemplateElement {
    return null;
  }

  /**
   * Lifecycle-Hook for rendering component markup
   * before generating global properties
   */
  public renderComponent(): void {
    const template = this.renderingTemplate();
    if (template !== null) {
      this.render(template);
    }
  }

  /**
   * Async rendering Method. Has to be overridden by extender
   * @async
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line require-await
  public async renderAsync(): Promise<void> {
    console.warn('please override renderAsync-method');
    return;
  }

  /**
   * renders Component inner Markup
   * @param {string | HTMLTemplateElement} template
   */
  public render(template: string | HTMLTemplateElement): void {
    if (!this.preserveChildren) this.getUiRoot().innerHTML = '';

    if (template instanceof HTMLTemplateElement) {
      this.getUiRoot().appendChild(template.content.cloneNode(true));
    } else if (this.useShadowDOM) {
      this.shadowRoot!.innerHTML = template;
    } else {
      this.insertAdjacentHTML('beforeend', template);
    }
  }

  /**
   * Lifecycle-Hook for removing markup on destroy
   */
  public destroyComponent(): void {
    // has to be overridden by extender
    console.warn('please override destroyComponent-method');
  }

  /**
   * Lifecycle-Hook after global properties initialization
   * can be overridden by components
   */
  public afterComponentRender(): void {
    // has to be overridden extender
  }

  public onComponentInitialized() {
    this.dispatchEvent(new CustomEvent(INITIALIZED_EVENT));
  }

  public async waitForInitialization() {
    if (this.state.initialized) return;
    return await waitForEvent(this, INITIALIZED_EVENT);
  }

  /* ====================================================
                    Component Properties
    ==================================================*/

  /**
   * Description
   */
  private async setupComponent(): Promise<void> {
    if (this.asyncRendering) {
      await this.renderAsync();
    } else {
      this.renderComponent();
    }
    this.setupComponentProps();
    this.afterComponentRender();
    this.checkForMissingAttributes();
    this.setState({ initialized: true });
  }

  /**
   * Generates global properties
   */
  private setupComponentProps(): void {
    this.enableDecoratedProperties();
    this.generateUI();
    this.generateEvents();
    this.initializeProps();
  }

  /**
   * removes all component Props (ui, event)
   */
  private destroyComponentProps(): void {
    this.destroyDecoratedProperties();
    this.removeEvents();
    this.ui = {};
  }

  /**
   * generates ui-Object by replacing selectors with HTML-Notes
   */
  private generateUI(): void {
    const uiRoot = this.getUiRoot();
    // Query DOM Nodes for ui-elements
    Object.keys(this.uiDefinitions).forEach((elementKey) => {
      const elementValue = this.uiDefinitions[elementKey].trim();
      if (elementValue.endsWith(':-one')) {
        const clearedSelector = elementValue.replace(/:-one/g, '').trim();
        this.ui[elementKey] = find<HTMLElement>(uiRoot as Component, clearedSelector);
      } else {
        this.ui[elementKey] = findAll<HTMLElement>(uiRoot as Component, elementValue);
      }
    });
  }

  /**
   * adds Event-Listeners for given Events
   */
  private generateEvents(): void {
    // Add given Events
    this.events.forEach((event) => {
      if (typeof this[event.handler] === 'function') {
        const targets = this.getEventTargets(event.target);
        // @ts-ignore
        onEvent(targets, event.event, this[event.handler], this, event.options);
      }
    });
  }

  /**
   * Removes all initially set eventbinding
   */
  private removeEvents(): void {
    this.events.forEach((event) => {
      if (typeof this[event.handler] === 'function') {
        const targets = this.getEventTargets(event.target);
        // @ts-ignore
        removeEvent(targets, event.event, this[event.handler], this, event.options);
      }
    });
  }

  /**
   * Recreates global ui-Object
   */
  public updateUI(): void {
    this.destroyDecoratedProperties();
    this.enableDecoratedProperties();
    this.ui = {};
    this.generateUI();
  }

  /**
   * Recreates Global Events-Array
   */
  public updateEvents(): void {
    this.events.forEach((event) => {
      if (typeof this[event.handler] === 'function') {
        const targets = this.getEventTargets(event.target);
        // @ts-ignore
        removeEvent(targets, event.event, this[event.handler], this, event.options);
        // @ts-ignore
        onEvent(targets, event.event, this[event.handler], this, event.options);
      }
    });
  }

  /* ====================================================
                    Decorator Handling
    ==================================================*/

  private enableDecoratedProperties() {
    // @ts-ignore
    if (this.decoratedUiEls === undefined) return;

    // @ts-ignore
    (this.decoratedUiEls as Map<keyof this, DecoratorUiDefinition<this>>).forEach((decoratorUiDef, property) => {
      if (decoratorUiDef.selector === 'window') {
        decoratorUiDef.events.forEach((event) => {
          // @ts-ignore
          onEvent(window, event.eventName, this[event.handler], this, event.options);
        });
      } else if (decoratorUiDef.selector === 'this') {
        decoratorUiDef.events.forEach((event) => {
          // @ts-ignore
          onEvent(this, event.eventName, this[event.handler], this, event.options);
        });
      } else {
        const curEl = decoratorUiDef.justOne
          ? find(this.getUiRoot() as HTMLElement, decoratorUiDef.selector)
          : findAll(this.getUiRoot() as HTMLElement, decoratorUiDef.selector);
        // @ts-ignore
        this[property] = curEl;
        decoratorUiDef.events.forEach((event) => {
          // @ts-ignore
          onEvent(this[property], event.eventName, this[event.handler], this, event.options);
        });
      }
    });
  }

  private destroyDecoratedProperties() {
    // @ts-ignore
    if (this.decoratedUiEls === undefined) return;

    // @ts-ignore
    (this.decoratedUiEls as Map<keyof this, DecoratorUiDefinition<this>>).forEach((decoratorUiDef, property) => {
      if (decoratorUiDef.selector === 'window') {
        decoratorUiDef.events.forEach((event) => {
          // @ts-ignore
          removeEvent(window, event.eventName, this[event.handler], this, event.options);
        });
      } else if (decoratorUiDef.selector === 'this') {
        decoratorUiDef.events.forEach((event) => {
          // @ts-ignore
          removeEvent(this, event.eventName, this[event.handler], this, event.options);
        });
      } else {
        const curEl = this[property];
        if (curEl !== null && curEl !== undefined) {
          decoratorUiDef.events.forEach((event) => {
            // @ts-ignore
            removeEvent(this[property], event.eventName, this[event.handler], this, event.options);
          });
        }
        // @ts-ignore
        this[property] = undefined;
      }
    });
  }

  /**
   * add property accessor and attribute change reactions
   *
   * @param {Record<string, any>} initializationProps
   * @returns {{
   *     [key: string]: PropDefinition;
   *   }}
   * @memberof Component
   */
  protected initializeProps(): void {
    // should be called after the constructor when props are defined in subclass as class properties
    this.addDefaultValueAndType(this.props);
    this.addPropAccessors(this.props);
    this.addPropsReactions(this.props);
  }

  /**
   * normalize props having prop definition or default values,
   *
   * @protected
   * @param {Record<string, any>} initializationProps
   * @returns {{ [key: string]: PropDefinition }}
   * @memberof Component
   */
  protected normalizeProps(initializationProps: Record<string, any>): { [key: string]: PropDefinition } {
    const props: {
      [key: string]: PropDefinition;
    } = {};

    // convert different types of props (propDef objects, or only the default value) to type `PropDefinition`
    Object.entries(initializationProps).forEach(([propName, value]: [string, any]) => {
      // if prop value is an object which has only the typeDefinition keys, assume it is meant as typeDef
      const isDefProp =
        typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length &&
        Object.keys(value).every((key) => propDefinitionKeys.includes(key));

      const prop: PropDefinition = isDefProp ? value : { defaultValue: value };

      prop.attributeName = prop.attributeName || toKebabCase(propName);

      props[propName] = {
        ...DEFAULT_PROP_DECORATOR_OPTIONS,
        ...prop,
      };
    });

    return props;
  }

  /**
   * fallback to the class properties value and types if props does not have a default value or type
   *
   * @protected
   * @param {{ [key: string]: PropDefinition }} props
   * @memberof Component
   */
  protected addDefaultValueAndType(props: { [key: string]: PropDefinition }): void {
    Object.entries(props).forEach(([propName, prop]: [string, any]) => {
      //@ts-ignore - prop is part of the class or will be set after the props initialization
      prop.defaultValue = prop.hasOwnProperty('defaultValue') ? prop.defaultValue : this[propName];
      //@ts-ignore - assuming user won't use any non supported type, in any case switch statement has a default type in the casting for that
      prop.type =
        prop.type || (prop.defaultValue !== null && prop.defaultValue !== undefined)
          ? typeof prop.defaultValue
          : 'string';
    });
  }

  /**
   * provide setter and getter for the given properties
   * to read and write value from the associated attribute
   *
   * @protected
   * @param {{ [key: string]: PropDefinition }} props
   * @returns {void}
   * @memberof Component
   */
  protected addPropAccessors(props: { [key: string]: PropDefinition }): void {
    for (const [propName, prop] of Object.entries(props)) {
      Object.defineProperty(this, propName, {
        enumerable: false,
        configurable: true,

        // add property accessors
        set(value: any) {
          if (typeof value === 'undefined' || value === null) {
            this.removeAttribute(prop.attributeName);
          } else if (prop.type === 'boolean') {
            // boolean attributes have no value. they only exist on the element: `<comp class="..."  attr />`
            if (value) this.setAttribute(prop.attributeName, '');
            else this.removeAttribute(prop.attributeName);
          } else if (prop.type === 'object') {
            this.setAttribute(prop.attributeName, JSON.stringify(value));
          }
          // string | number
          else {
            this.setAttribute(prop.attributeName, String(value));
          }
        },

        get() {
          const attributeValue = this.getAttribute(prop.attributeName);

          return attributeValue === null && prop.defaultValue !== undefined
            ? prop.defaultValue
            : this.castFromAttribute(attributeValue, prop.type);
        },
      });
    }
  }

  /**
   * for props having reactions, add observer to call these reactions when the attribute is modified.
   *
   * @protected
   * @param {{ [key: string]: PropDefinition }} props
   * @returns {void}
   * @memberof Component
   */
  protected addPropsReactions(props: { [key: string]: PropDefinition }): void {
    const propsWithReactions = Object.entries(props).filter(
      ([, prop]) => Array.isArray(prop.reactions) && prop.reactions.length,
    );

    // no reactions
    if (propsWithReactions.length === 0) return;

    const invokePropReactions = (attributeName: string) => {
      const [propName, prop] = propsWithReactions.find(([, prop]) => prop.attributeName === attributeName)!;

      prop.reactions!.forEach((reaction) => {
        if (typeof reaction === 'function') {
          // bind context to the component instance
          // @ts-ignore - accessor for the property have been added
          reaction.call(this, this[propName]);
          // @ts-ignore -
        } else if (typeof reaction === 'string' && reaction in this && typeof this[reaction] === 'function') {
          // @ts-ignore -
          this[reaction](this[propName]);
        } else {
          console.error('unknown given reaction callback: ', reaction);
        }
      });
    };

    // Options for attributes mutation observer
    const config: MutationObserverInit = {
      attributes: true,
      attributeFilter: propsWithReactions.map(([, prop]) => prop.attributeName!),
      attributeOldValue: true,
    };
    // Create an observer instance and call the attributeChangedCallback on mutation
    const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        const oldValue = mutation.oldValue;
        const newValue = this.getAttribute(mutation.attributeName!);
        // attribute was re-set with the same value. No reaction needed
        if (newValue === oldValue) return;

        invokePropReactions(mutation.attributeName!);
      }
    });
    observer.observe(this, config);

    // call onInit reactions
    propsWithReactions
      .filter(([, prop]) => prop.reactOnInit)
      .forEach(([, prop]) => invokePropReactions(prop.attributeName!));
  }

  /**
   * warn if the component is missing some necessary attributes
   *
   * @protected
   * @memberof Component
   */
  protected checkForMissingAttributes(): void {
    const missingAttrs = [];

    for (const prop of Object.values(this.props)) {
      if (prop.required && !this.hasAttribute(prop.attributeName!)) {
        missingAttrs.push(prop.attributeName);
      }
    }

    if (missingAttrs.length)
      console.log(`${this.tagName.toLowerCase()} is missing required attribute(s): ${missingAttrs.join(', ')}`);
  }

  /**
   * converts the value read from attribute to the given type.
   *
   * @example
   *  castFromAttribute("12", "number") === 12;
   * @protected
   * @param {(string | null)} attributeValue
   * @param {PropCastTypes} [type='string']
   * @returns {(boolean | number | Record<string, unknown> | null | string)}
   * @throws {TypeError} - when type is object and the value can't be JSON parsed.
   * @memberof Component
   */
  protected castFromAttribute(
    attributeValue: string | null,
    type: PropCastTypes = 'string',
  ): boolean | number | Record<string, unknown> | null | string {
    switch (type) {
      case 'boolean':
        // "" (empty string), "false" as the attribute value are all accepted as true
        return attributeValue !== null;

      case 'number':
        // undefined, null will be interpreted as `NaN` and not `0`.
        return parseFloat(String(attributeValue));

      case 'object':
        return JSON.parse(String(attributeValue));

      // string
      default:
        // will return `null` when attributeValue is null and not an empty string (`""`)
        return attributeValue;
    }
  }

  /* ====================================================
                    State Handling
    ==================================================*/

  /**
   * return a clone of the current state
   * @returns {object}
   * @alias Component.state
   */
  public get state(): any {
    return naiveClone(this._state || {});
  }

  /**
   * explicitly prevents the state to be reset
   * @param {*} arg
   * @throw error always
   */
  public set state(arg: any) {
    throw new Error('The state should only be modified via the "setState" method.');
  }

  /**
   * sets the initial state. Would overwrite the current state if set before.
   * @param {object} initialStates
   */
  protected set initialStates(initialStates: object) {
    this._initialStates = initialStates;
    this._state = initialStates;
  }

  /**
   * returns the initial state
   * @returns {*|{}}
   */
  protected get initialStates(): object {
    return this._initialStates || {};
  }

  /**
   * updates state object an triggers the reactions if needed
   *
   * @param {object} change - the new/modifed state key value map
   * @param {Object} [options]
   * @param {boolean} [options.merge] - should the given change be merged with the current state
   * @param {boolean} [options.silent=false] - should the reactions be called
   * @return {Object} this
   * @alias Component.setState
   */
  public setState(change: object, { merge = true, silent = false } = {}) {
    const oldState = this.state;
    this._state = naiveClone(Object.assign({}, merge ? oldState : {}, change));

    if (silent || isEqual(oldState, this._state)) {
      return this;
    }

    // cache the new state to:
    // 1- no need of clone for each prop check,
    // 2- no mutation during nested state changes
    const newState = this.state;

    const reactions = this.reactions || {};
    // invoke necessary reactions
    Object.keys(reactions).forEach((prop) => {
      // always invoke the wildcard reaction
      if (prop === '*') {
        this.invokeReaction('*');
      }
      // for not wildcard, and in change object mentioned, test if it was modified
      else if (prop in change) {
        const oldValue = getValue(oldState, prop);
        const newValue = getValue(newState, prop);
        if (!isEqual(oldValue, newValue)) {
          this.invokeReaction(prop);
        }
      }
    });

    return this;
  }

  /**
   * adds a callBack function for the given key to the reactions list.
   * @param {string|object} propName - property name or key value pair for propNaem, callback
   * @param {string[]} callbacks - callback functions
   * @return {Object} this
   * @alias Component.addReactions
   */
  private addReactions(propName: string | object, callbacks?: string[]): object {
    if (typeof propName === 'object') {
      Object.entries(propName).forEach(([key, val]) => this.addReactions(key, val));
    } else {
      this.reactions = this.reactions || {};
      // for simplicity, convert always to array
      const newCallbacks = toArray(callbacks);
      const oldCallbacks = this.reactions[propName] || [];
      // @ts-ignore
      this.reactions[propName] = mergeArraysBy(oldCallbacks, newCallbacks, this.isNewReaction);
    }
    return this;
  }

  private isNewReaction(reaction: string, newReactions: string[]) {
    return !newReactions.some((newReaction: string) => {
      return reaction === newReaction;
    });
  }

  /**
   * removes a callBack function for the given key to the reactions list.
   * @param {string|Object} propName - property name
   * @param {string[]} callbacks - call back function
   * @return {Object} this
   * @alias Component.removeReactions
   */
  private removeReactions(propName: string | object, callbacks: string[]): object {
    if (typeof propName === 'object') {
      Object.entries(propName).forEach(([key, val]) => this.removeReactions(key, val));
      return this;
    }
    // if ! propName in reactions return false / warn
    if (!this.reactions.hasOwnProperty(propName)) {
      console.warn('no such prop found ');
    }
    // callBack == undefined
    else if (!callbacks) {
      delete this.reactions[propName];
    } else {
      // remove callback from values,
      callbacks.forEach((cb) => {
        this.reactions[propName] = this.reactions[propName].filter((e) => e !== cb);
      });
      // if no value left -> delete key from reactions
      if (this.reactions[propName].length === 0) {
        delete this.reactions[propName];
      }
    }

    return this;
  }

  /**
   * invokes the callback for the given property name
   * @param {string} propName - property key name
   * @alias Component.invokeReaction
   */
  private invokeReaction(propName: string): void {
    const reactions = this.reactions || {};
    const callbacks = reactions[propName] || new Set();
    callbacks.forEach((cb: keyof this | Function) => {
      if (typeof cb === 'function') {
        cb(this.state);
      } else if (typeof cb === 'string' && cb in this && typeof this[cb] === 'function') {
        // @ts-ignore
        this[cb](this.state);
      } else {
        console.error("given reaction callback can't be found: ", cb);
      }
    });
  }

  /* ====================================================
                        Helper
    ==================================================*/

  /**
   * Add new Events to Global Events-Array
   * @param  {Array<ComponentEvent>} newEvents  Event-Object-Array
   */
  protected mergeEvents(newEvents: ComponentEvent[]): void {
    this.events = this.events.filter((event) => this.isNewEvent(event, newEvents)).concat(newEvents);
  }

  /**
   * Checks if specific Event is already in specific Event-Array
   * @param {ComponentEvent} event    Event-Object to be checked
   * @param {Array<ComponentEvent>} eventArr  Event-Object-Array to be checked
   *
   * @returns {boolean}        is given Event not in given Event-Array
   */
  private isNewEvent(event: ComponentEvent, eventArr: ComponentEvent[]): boolean {
    return !eventArr.some((newEvent) => {
      return newEvent.event === event.event && newEvent.target === event.target;
    });
  }

  /**
   * Get DOM-Root of Component (shadowDOM or documentDOM)
   *
   * @returns { ShadowRoot | Component} - DOM-Root of Component
   */
  public getUiRoot(): ShadowRoot | Component {
    if (this.shadowRoot) return this.shadowRoot;
    return this;
  }

  /**
   * Filter Keyname Elements (like this or window) from ui-elements
   *
   * @param {string} eventTarget  name of event Target Element
   * @returns {Array} DOM-Root of Component
   */
  private getEventTargets(eventTarget: string) {
    let targets = null;

    if (eventTarget === 'this') {
      // eslint-disable-next-line consistent-this
      targets = this;
    } else if (eventTarget === 'window') {
      targets = window;
    } else {
      targets = this.ui[eventTarget];
    }

    return targets;
  }
}
