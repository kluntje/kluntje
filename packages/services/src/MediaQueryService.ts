import { throttle } from '@kluntje/js-utils/lib/function-helpers/decorators';
import { onEvent, getCurrentMQ, MQDefinition } from '@kluntje/js-utils/lib/dom-helpers';
import { MQ_CHANGE_EVENT } from './eventNames';

export class MediaQueryService {
  private static instance: MediaQueryService;
  static mediaQuerys: Array<MQDefinition>;
  eventIdMap: WeakMap<HTMLElement | Function, string>;
  eventBindingMap: {
    [index: string]: EventListenerOrEventListenerObject;
  };
  lastMQ: string;

  private constructor() {
    this.eventIdMap = new WeakMap();
    this.eventBindingMap = {};
    this.lastMQ = getCurrentMQ(MediaQueryService.mediaQuerys);
    onEvent(window, 'resize', this.handleMQChange, this);
  }

  static getInstance(mediaQuerys: Array<MQDefinition>) {
    if (MediaQueryService.instance === undefined) {
      MediaQueryService.mediaQuerys = mediaQuerys;
      MediaQueryService.instance = new MediaQueryService();
    }
    return MediaQueryService.instance;
  }

  @throttle(100)
  handleMQChange() {
    const newMQ = getCurrentMQ(MediaQueryService.mediaQuerys);
    if (newMQ === this.lastMQ) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(MQ_CHANGE_EVENT, {
        detail: {
          newMQ,
          oldMQ: this.lastMQ,
        },
      }),
    );

    this.lastMQ = newMQ;
  }
}
