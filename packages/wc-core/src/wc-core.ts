import { naiveClone, isEqual, getValue, toArray } from 'Helper/objectHelper';
import { mergeArraysBy, pushIfNew, hasElement } from 'Helper/arrayHelper';
import { onEvent, removeEvent, getCurrentMQ } from 'Helper/domHelper';
import { removeAllBS } from 'Helper/stringHelper';
import { CookieService } from 'Services/CookieService';

type ComponentUiEl = {
  [key: string]: any;
};

type ComponentEvent = {
  event: string;
  target: string;
  handler: string;
};

type ComponentStates = {
  [key: string]: any;
};

type ComponentReactions = {
  [key: string]: string[];
};

export type ComponentArgs = {
  ui?: ComponentUiEl;
  events?: ComponentEvent[];
  initialStates?: ComponentStates;
  reactions?: ComponentReactions;
  useShadowDOM?: Boolean;
  preserveChilds?: Boolean;
  asyncRendering?: Boolean;
};

export class Component extends HTMLElement {
  ui: ComponentUiEl;

  events: ComponentEvent[];

  selectors: ComponentUiEl;

  useShadowDOM: Boolean;

  preserveChilds: Boolean;

  asyncRendering: Boolean;

  reactions: ComponentReactions;

  eventIdMap: WeakMap<HTMLElement | Function, string>;

  eventBindingMap: object;

  [key: string]: any;

  constructor({
    ui = {},
    events = [],
    initialStates = {},
    reactions = {},
    useShadowDOM = false,
    preserveChilds = false,
    asyncRendering = false,
  }: ComponentArgs) {
    super();
    this.ui = {};
    this.selectors = {};
    this.events = [];
    this.initialStates = {
      initialized: false,
    };
    this.reactions = {};
    this.useShadowDOM = useShadowDOM;
    this.preserveChilds = preserveChilds;
    this.asyncRendering = asyncRendering;
    this.eventIdMap = new WeakMap();
    this.eventBindingMap = {};

    // initialize shadowDOM if needed
    if (this.useShadowDOM) {
      this.attachShadow({ mode: 'open' });
    }

    Object.assign(this.ui, ui);
    Object.assign(this.selectors, ui);

    Object.assign(this.initialStates, initialStates);
    Object.assign(this.reactions, reactions);

    this.addReactions(reactions);

    this.mergeEvents(events);
    onEvent(window, 'pv-mq-change', this.handleMqChange, this);
  }

  /*====================================================
                  MQ Handling
    ==================================================*/

  /**
   * gets active-on-mq attribute and parses MQ
   * @returns {string[] | false}
   */
  get activeOnMQs(): string[] | false {
    const activeOnMQ = this.getAttribute('active-on-mq') || false;

    if (!activeOnMQ) {
      return false;
    }

    let activeMQs: string[] = [];

    removeAllBS(activeOnMQ).split(',').forEach((mqDef: string) => {
      if (mqDef.length === 1) {
        activeMQs = pushIfNew(activeMQs, `MQ${mqDef}`);
      }
      else if (mqDef.length > 1) {
        const mqRange = mqDef.split('-');
        const mqRangeStart = parseInt(mqRange[0], 10);
        const mqRangeEnd = parseInt(mqRange[1], 10);
        for (let mq = mqRangeStart; mq <= mqRangeEnd; mq++) {
          activeMQs = pushIfNew(activeMQs, `MQ${mq.toString()}`);
        }
      }
    });

    return activeMQs;
  }

  /**
   * returns currentMQ
   * @returns {string}
   */
  get currentMQ(): string {
    return getCurrentMQ();
  }

  /**
   * tells, whether the Component should be active on the current MQ
   * @returns {boolean}
   */
  get activeOnCurrentMQ(): boolean {
    return (this.activeOnMQs && hasElement(this.activeOnMQs || [], this.currentMQ))
        || !this.activeOnMQs;
  }

  /*====================================================
                  Services
    ==================================================*/

  /**
   * Returns Cookie Service of the App for comfortable use in Components
   * @returns {CookieService}
   */
  get cookieService(): CookieService {
    // TODO: make configurable
    return window._pvCookieService;
  }

  /**
   * Returns Viewport Observer of the App for comfortable use in Components
   * @returns {IntersectionObserver}
   */
  get viewportObserver(): IntersectionObserver {
    // TODO: make configurable
    return window._pvViewportObserver;
  }

  /**
   * handle MQ Change Event, by connecting or disconnecting the Componenent if needed
   * used for active-on-mq rendering
   * @param {CustomEvent} e
   */
  handleMqChange(e: CustomEvent): void {
    if (!this.activeOnMQs) {
      return;
    }

    if (!this.state.initialized && this.activeOnCurrentMQ) {
      this.connectedCallback();
    }
    else if (this.state.initialized && !this.activeOnCurrentMQ) {
      this.disconnectComponent();
    }
  }

  /*====================================================
                    Lifcycle-Hooks
    ==================================================*/

  /**
   * On Web-Components-Lifcycle-Hook add own Lifcycle-Hooks
   * and generate global properties
   */
  connectedCallback(): void {
    // if active-on-mq parameter is set,
    // initialize component just on given MQs
    if (!this.activeOnCurrentMQ) {
      return;
    }

    this.setupComponent();
  }

  /**
   * Lifecycle-Hook, triggered before componentProps get destroyed
   */
  beforeComponentDisconnects(): void {
    // can be overridden
  }

  /**
   * Lifecycle-Hook, needed to destroy Component on non active MQs
   */
  disconnectComponent(): void {
    this.beforeComponentDisconnects();
    this.destroyComponentProps();
    this.destroyComponent();
    this.setState({ initialized: false });
  }

  /**
   * Overrideable rendering Template getter
   * @returns rendering template for component
   */
  renderingTemplate(): string | null {
    return null;
  }

  /**
   * Lifecycle-Hook for rendering component markup
   * before generating global properties
   */
  renderComponent(): void {
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
  async renderAsync(): Promise<void> {
    console.warn('please override renderAsync-method');
    return;
  }

  /**
   * renders Component inner Markup
   * @param {string} template
   */
  render(template: string): void {
    if (this.preserveChilds) {
      this.getUiRoot().innerHTML += template;
    }
    else {
      this.getUiRoot().innerHTML = template;
    }
  }

  /**
   * Lifecycle-Hook for removing markup on destroy
   */
  destroyComponent(): void {
    // has to be overidden by extender
    console.warn('please override destroyComponent-method');
  }

  /**
   * Lifecycle-Hook after global properties initialization
   * can be overidden by components
   */
  afterComponentRender(): void {
    // has to be overidden extender
  }

  /*====================================================
                    Component Properties
    ==================================================*/

  /**
   * Description
   */
  async setupComponent(): Promise<void> {
    if (this.asyncRendering) {
      await this.renderAsync();
    }
    else {
      this.renderComponent();
    }
    this.setupComponentProps();
    this.afterComponentRender();
    this.setState({ initialized: true });
  }

  /**
   * Generates global properties
   */
  setupComponentProps(): void {
    this.generateUI();
    this.generateEvents();
  }

  /**
   * removes all component Props (ui, event)
   */
  destroyComponentProps(): void {
    this.removeEvents();
    this.ui = Object.assign({}, this.selectors);
  }

  /**
   * generates ui-Object by replacing selectors with HTML-Notes
   */
  generateUI(): void {
    const uiRoot = this.getUiRoot();
    // Query DOM Nodes for ui-elements
    Object.keys(this.ui).forEach(elementKey => {
      const elementValue = this.ui[elementKey].trim();
      if (elementValue.endsWith(':-one')) {
        this.ui[elementKey] = uiRoot.querySelector(
          elementValue.replace(/:-one/g, '').trim(),
        );
      }
      else {
        this.ui[elementKey] = uiRoot.querySelectorAll(elementValue);
      }
    });
  }

  /**
   * adds Event-Listeners for given Events
   */
  generateEvents(): void {
    // Add given Events
    this.events.forEach(event => {
      if (typeof this[event.handler] === 'function') {
        const targets = this.getEventTargets(event.target);
        onEvent(targets, event.event, this[event.handler], this);
      }
    });
  }

  /**
   * Removes all initially set eventbinding
   */
  removeEvents(): void {
    this.events.forEach(event => {
      if (typeof this[event.handler] === 'function') {
        const targets = this.getEventTargets(event.target);
        if (NodeList.prototype.isPrototypeOf(targets)) {
          targets.forEach((target: Node) => {
            removeEvent(target, event.event, this[event.handler], this);
          });
        }
        else {
          removeEvent(targets, event.event, this[event.handler], this);
        }
      }
    });
  }

  /**
   * Recreates global ui-Object
   */
  updateUI(): void {
    const uiRoot = this.getUiRoot();
    this.ui = {};
    Object.keys(this.selectors).forEach(elementKey => {
      const elementValue = this.selectors[elementKey].trim();
      if (elementValue.endsWith(':-one')) {
        this.ui[elementKey] = uiRoot.querySelector(
          elementValue.replace(/:-one/g, '').trim(),
        );
      }
      else {
        this.ui[elementKey] = uiRoot.querySelectorAll(elementValue);
      }
    });
  }

  /**
   * Recreates Global Events-Array
   */
  updateEvents(): void {
    this.events.forEach(event => {
      if (typeof this[event.handler] === 'function') {

        const targets = this.getEventTargets(event.target);

        if (NodeList.prototype.isPrototypeOf(targets)) {
          targets.forEach((target: Node) => {
            removeEvent(target, event.event, this[event.handler], this);
            onEvent(target, event.event, this[event.handler], this);
          });
        }
        else {
          removeEvent(targets, event.event, this[event.handler], this);
          onEvent(targets, event.event, this[event.handler], this);
        }
      }
    });
  }

  /*====================================================
                    State Handling
    ==================================================*/

  /**
   * return a clone of the current state
   * @returns {object}
   * @alias Component.state
   */
  get state(): any {
    return naiveClone(this._state || {});
  }

  /**
   * explicitly prevents the state to be reset
   * @param {*} arg
   * @throw error always
   */
  set state(arg: any) {
    throw new Error(
      'The state should only be modified via the "setState" method.',
    );
  }

  /**
   * sets the initial state. Would overwrite the current state if set before.
   * @param {object} initialStates
   */
  set initialStates(initialStates: object) {
    this._initialStates = initialStates;
    this._state = initialStates;
  }

  /**
   * returns the initial state
   * @returns {*|{}}
   */
  get initialStates(): object {
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
  setState(change: object, { merge = true, silent = false } = {}) {
    const oldState = this.state;
    this._state = Object.assign({}, merge ? oldState : {}, change);

    if (silent || isEqual(oldState, this._state)) {
      return this;
    }

    // cache the new state to:
    // 1- no need of clone for each prop check,
    // 2- no mutation during nested state changes
    const newState = this.state;

    const reactions = this.reactions || {};
    // invoke necessary reactions
    Object.keys(reactions).forEach(prop => {
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
  addReactions (propName: string|object, callbacks?: string[]): object {
    if (typeof propName === 'object') {
      Object.entries(propName).forEach(([key, val]) => this.addReactions(key, val));
    }
    else {
      this.reactions = this.reactions || {};
      // for simplicity, convert always to array
      const newCallbacks = toArray(callbacks);
      const oldCallbacks = this.reactions[propName] || [];
      this.reactions[propName] = mergeArraysBy(oldCallbacks, newCallbacks, this.isNewReaction);
    }
    return this;
  }

  isNewReaction(reaction:string, newReactions:string[]) {
    return !newReactions.some((newReaction:string) => {
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
  removeReactions(propName: string | object, callbacks: string[]): object {
    if (typeof propName === 'object') {
      Object.entries(propName).forEach(([key, val]) =>
        this.removeReactions(key, val),
      );
      return this;
    }
    // if ! propName in reactions return false / warn
    if (!this.reactions.hasOwnProperty(propName)) {
      console.warn('no such prop found ');
    }
    // callBack == undefined
    else if (!callbacks) {
      delete this.reactions[propName];
    }
    else {
      // remove callback from values,
      callbacks.forEach(cb => {
        this.reactions[propName] = this.reactions[propName].filter(e => e !== cb);
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
  invokeReaction(propName: string): void {
    const reactions = this.reactions || {};
    const callbacks = reactions[propName] || new Set();
    callbacks.forEach((cb: string | Function) => {
      if (typeof cb === 'function') {
        cb(this.state, this.props);
      }
      else if (
        typeof cb === 'string' &&
        cb in this &&
        typeof this[cb] === 'function'
      ) {
        this[cb](this.state, this.props);
      }
      else {
        console.error("given reaction callback can't be found: ", cb);
      }
    });
  }

  /*====================================================
                        Helper
    ==================================================*/

  /**
   * Add new Events to Global Events-Array
   * @param newEvents  Event-Object-Array
   */
  mergeEvents(newEvents: ComponentEvent[]): void {
    this.events = this.events
      .filter(event => {
        if (this.isNewEvent(event, newEvents)) return event;
      })
      .concat(newEvents);
  }

  /**
   * Checks if specific Event is already in specific Event-Array
   * @param event     Event-Object to be checked
   * @param eventArr  Event-Object-Array to be checked
   *
   * @returns         is given Event not in given Event-Array
   */
  isNewEvent(event: ComponentEvent, eventArr: ComponentEvent[]): Boolean {
    return !eventArr.some(newEvent => {
      return newEvent.event === event.event && newEvent.target === event.target;
    });
  }

  /**
   * Get DOM-Root of Component (shadowDOM or documentDOM)
   *
   * @returns DOM-Root of Component
   */
  getUiRoot(): ShadowRoot | Component {
    if (this.shadowRoot) return this.shadowRoot;
    return this;
  }

  /**
   * Filter Keyname Elements (like this or window) from ui-elements
   *
   * @param {string} eventTarget  name of event Target Element
   * @returns DOM-Root of Component
   */
  getEventTargets(eventTarget: string) {
    let targets = null;

    if (eventTarget === 'this') {
      targets = this;
    }
    else if (eventTarget === 'window') {
      targets = window;
    }
    else {
      targets = this.ui[eventTarget];
    }

    return targets;
  }
}
