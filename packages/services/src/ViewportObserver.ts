import { IN_VP_EVENT, OUT_VP_EVENT } from './eventNames';

type IntersectionEvent = {
  [key: string]: any;
};

export class ViewportObserver {
  private static instance: IntersectionObserver;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (ViewportObserver.instance === undefined) {
      ViewportObserver.instance = new IntersectionObserver(ViewportObserver.handleIntersectionChange);
    }
    return ViewportObserver.instance;
  }

  private static handleIntersectionChange(e: IntersectionEvent) {
    Object.keys(e).forEach((key) => {
      const observedEl = e[key];
      const target = observedEl.target;

      if (observedEl.isIntersecting) {
        target.dispatchEvent(new CustomEvent(IN_VP_EVENT, { bubbles: false }));
      } else {
        target.dispatchEvent(new CustomEvent(OUT_VP_EVENT, { bubbles: false }));
      }
    });
  }
}
