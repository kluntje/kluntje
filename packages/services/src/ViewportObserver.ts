type IntersectionEvent = {
  [key :string]: any;
};

export class ViewportObserver {
  private static instance: IntersectionObserver;

  private constructor() {
  }

  static getInstance() {
    if (ViewportObserver.instance === undefined) {
      ViewportObserver.instance = new IntersectionObserver(ViewportObserver.handleIntersectionChange);
    }
    return ViewportObserver.instance;
  }

  private static handleIntersectionChange(e: IntersectionEvent) {
    Object.keys(e).forEach(key => {
      const observedEl = e[key];
      const target = observedEl.target;

      if (observedEl.isIntersecting) {
        target.dispatchEvent(new CustomEvent('kl-in-vp'));
      }
      else {
        target.dispatchEvent(new CustomEvent('kl-out-vp'));
      }
    });
  }
}
