import { ViewportObserver } from '../ViewportObserver';

describe('ViewportObsever tests:', () => {
  const intersectionObserverContructorSpy = jest.fn();
  // @ts-ignore
  global.IntersectionObserver = class IntersectionObserver {
    constructor(...args: any) {
      intersectionObserverContructorSpy(...args);
    }

    observe() {
      return null;
    }

    unobserve() {
      return null;
    }
  };

  afterEach(() => {
    intersectionObserverContructorSpy.mockReset();
    // @ts-ignore
    ViewportObserver.instance = undefined;
  });

  describe('getInstance method', () => {
    test('should create IntersectionObserver instance with handleIntersectionChange callback', () => {
      ViewportObserver.getInstance();
      // @ts-ignore
      expect(intersectionObserverContructorSpy).toBeCalledWith(ViewportObserver.handleIntersectionChange);
    });

    test('should call intersectionObserverContructorSpy only on first call', () => {
      ViewportObserver.getInstance();
      ViewportObserver.getInstance();
      ViewportObserver.getInstance();
      expect(intersectionObserverContructorSpy).toBeCalledTimes(1);
    });

    test('should return instance of IntersectionObserver', () => {
      const out = ViewportObserver.getInstance();
      expect(out).toBeInstanceOf(IntersectionObserver);
    });
  });

  describe('handleIntersectionChange method', () => {
    const mockObservedEl1 = document.createElement('img');
    const mockObservedEl2 = document.createElement('img');
    const mockObservedEl3 = document.createElement('img');
    const mockObservedEl4 = document.createElement('img');
    const mockIntersectionEvent = {
      el1: {
        target: mockObservedEl1,
        isIntersecting: true,
      },
      el2: {
        target: mockObservedEl2,
        isIntersecting: false,
      },
      el3: {
        target: mockObservedEl3,
        isIntersecting: true,
      },
      el4: {
        target: mockObservedEl4,
        isIntersecting: false,
      },
    };

    beforeEach(() => {
      spyOn(mockObservedEl1, 'dispatchEvent');
      spyOn(mockObservedEl2, 'dispatchEvent');
      spyOn(mockObservedEl3, 'dispatchEvent');
      spyOn(mockObservedEl4, 'dispatchEvent');
      spyOn(window, 'CustomEvent');
      // @ts-ignore
      ViewportObserver.handleIntersectionChange(mockIntersectionEvent);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('should dispatch kl-in-vp event on all intersecting element', () => {
      expect(mockObservedEl1.dispatchEvent).toBeCalled();
      expect(mockObservedEl3.dispatchEvent).toBeCalled();
      expect(window.CustomEvent).nthCalledWith(1, 'kl-in-vp');
      expect(window.CustomEvent).nthCalledWith(3, 'kl-in-vp');
    });

    test('should dispatch kl-out-vp event on all non-intersecting element', () => {
      expect(mockObservedEl2.dispatchEvent).toBeCalled();
      expect(mockObservedEl4.dispatchEvent).toBeCalled();
      expect(window.CustomEvent).nthCalledWith(4, 'kl-out-vp');
    });
  });
});
