/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { removeAllBS } from '@kluntje/js-utils/lib/string-helpers';
import { pushIfNew, hasElement } from '@kluntje/js-utils/lib/array-helpers';
import { onEvent, MQDefinition, getCurrentMQ } from '@kluntje/js-utils/lib/dom-helpers';
import { MediaQueryService } from '@kluntje/services';

export { default as prop } from './prop';
export { default as tag } from './tag';
// eslint-disable-next-line prettier/prettier
export type { PropDefinition, PropCastTypes } from './prop';

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

export function uiEvent<T>(elementName: keyof T | 'window' | 'this', eventName: string) {
  return function decorator(component: any, handlerName: string) {
    if (component.decoratedUiEls === undefined) component.decoratedUiEls = new Map();

    const curUiElement = component.decoratedUiEls.get(elementName);

    if (curUiElement === undefined && (elementName === 'window' || elementName === 'this')) {
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

export function MQBasedRendered<T extends { new (...args: any[]): any }>(mediaQueries: Array<MQDefinition>) {
  return function decorator(target: T): T {
    return class extends target {
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

        removeAllBS(activeOnMQ)
          .split(',')
          .forEach((mqDef: string) => {
            if (mqDef.length === 1) {
              activeMQs = pushIfNew(activeMQs, `MQ${mqDef}`);
            } else if (mqDef.length > 1) {
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
        return getCurrentMQ(mediaQueries);
      }

      /**
       * tells, whether the Component should be active on the current MQ
       * @returns {boolean}
       */
      get activeOnCurrentMQ(): boolean {
        return (this.activeOnMQs && hasElement(this.activeOnMQs || [], this.currentMQ)) || !this.activeOnMQs;
      }

      /**
       * handle MQ Change Event, by connecting or disconnecting the Componenent if needed
       * used for active-on-mq rendering
       * @param {CustomEvent} e
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleMqChange(e: CustomEvent): void {
        if (!this.activeOnMQs) {
          return;
        }

        if (!this.state.initialized && this.activeOnCurrentMQ) {
          this.mqBasedConnect();
        } else if (this.state.initialized && !this.activeOnCurrentMQ) {
          this.disconnectComponent();
        }
      }

      mqBasedConnect() {
        // if active-on-mq parameter is set,
        // initialize component just on given MQs
        if (!this.activeOnCurrentMQ) {
          return;
        }

        super.connectedCallback();
      }

      /**
       * On Web-Components-Lifcycle-Hook add own Lifcycle-Hooks
       * and generate global properties
       */
      connectedCallback(): void {
        MediaQueryService.getInstance(mediaQueries);
        // @ts-ignore
        onEvent(window, 'kl-mq-change', this.handleMqChange, this);
        this.mqBasedConnect();
      }
    };
  };
}
