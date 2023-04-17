import { removeEvent, onEvent } from '..';

describe('removeEvent tests:', () => {
  let mockTarget = document.createElement('a');
  let mockTargets: Array<HTMLElement>;
  class MockContext {
    eventBindingMap: {
      [index: string]: EventListenerOrEventListenerObject;
    } = {};
    eventIdMap: WeakMap<HTMLElement | Function, string> = new WeakMap();

    mockHandler() {
      jest.fn();
    }
  }
  let mockContext = new MockContext();

  beforeEach(() => {
    mockTarget = document.createElement('a');
    mockTargets = [
      document.createElement('button'),
      document.createElement('a'),
      document.createElement('a'),
      document.createElement('button'),
      document.createElement('button'),
    ];
    mockContext = new MockContext();
    spyOn(mockTarget, 'removeEventListener').and.callThrough();
    spyOn(mockTargets[0], 'removeEventListener').and.callThrough();
    spyOn(mockTargets[1], 'removeEventListener').and.callThrough();
    spyOn(mockTargets[2], 'removeEventListener').and.callThrough();
    spyOn(mockTargets[3], 'removeEventListener').and.callThrough();
    spyOn(mockTargets[4], 'removeEventListener').and.callThrough();
    spyOn(mockContext, 'mockHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('eventListener tests:', () => {
    describe('no target element', () => {
      test('should not try to add eventListener', () => {
        removeEvent(null, 'click', mockContext.mockHandler, mockContext);
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('click'));
        expect(mockContext.mockHandler).not.toBeCalled();
      });
    });

    describe('single target element', () => {
      test('should remove eventListener to target', () => {
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        removeEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(mockTarget.removeEventListener).toBeCalled();
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('click'));
        expect(mockContext.mockHandler).not.toBeCalled();
      });

      test('should remove eventListener with option from target', () => {
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext, { once: true });
        removeEvent(mockTarget, 'click', mockContext.mockHandler, mockContext, { once: true });
        mockTarget.dispatchEvent(new Event('click'));
        expect(mockContext.mockHandler).not.toBeCalled();
      });

      test('should remove listeners of all events in space separeted string', () => {
        onEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        removeEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(mockTarget.removeEventListener).toBeCalledTimes(3);
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('click'));
        mockTarget.dispatchEvent(new Event('touchstart'));
        mockTarget.dispatchEvent(new Event('touchend'));
        expect(mockContext.mockHandler).not.toBeCalled();
      });

      test('should remove listeners for all events given in Array<string>', () => {
        onEvent(mockTarget, ['mouseenter', 'mouseleave'], mockContext.mockHandler, mockContext);
        removeEvent(mockTarget, ['mouseenter', 'mouseleave'], mockContext.mockHandler, mockContext);
        expect(mockTarget.removeEventListener).toBeCalledTimes(2);
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('mouseenter'));
        mockTarget.dispatchEvent(new Event('mouseleave'));
        expect(mockContext.mockHandler).not.toBeCalled();
      });
    });

    describe('multiple target elements', () => {
      test('should remove eventListener from target', () => {
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        removeEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(curTarget.removeEventListener).toBeCalled());
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTargets.forEach((curTarget) => curTarget.dispatchEvent(new Event('click')));
        expect(mockContext.mockHandler).not.toBeCalled();
      });

      test('should remove listeners of all events in space separeted string', () => {
        onEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        removeEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(curTarget.removeEventListener).toBeCalledTimes(3));
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTargets.forEach((curTarget) => {
          curTarget.dispatchEvent(new Event('click'));
          curTarget.dispatchEvent(new Event('touchstart'));
          curTarget.dispatchEvent(new Event('touchend'));
        });
        expect(mockContext.mockHandler).not.toBeCalled();
      });

      test('should remove listeners of all events given in Array<string>', () => {
        onEvent(mockTargets, ['mouseenter', 'mouseleave'], mockContext.mockHandler, mockContext);
        removeEvent(mockTargets, ['mouseenter', 'mouseleave'], mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(curTarget.removeEventListener).toBeCalledTimes(2));
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTargets.forEach((curTarget) => {
          curTarget.dispatchEvent(new Event('mouseenter'));
          curTarget.dispatchEvent(new Event('mouseleave'));
        });
        expect(mockContext.mockHandler).not.toBeCalled();
      });
    });
  });

  describe('event administration tests:', () => {
    describe('no target element', () => {
      test('should not add new objects for target, handler and context to eventIdMap', () => {
        onEvent(null, 'click', mockContext.mockHandler, mockContext);
        expect(mockContext.eventIdMap.has(mockContext.mockHandler)).toBe(false);
        // @ts-ignore
        expect(mockContext.eventIdMap.has(mockContext)).toBe(false);
      });

      test('should not add new event-binding to eventBindingMap in Context', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(null, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
      });
    });

    describe('single target element', () => {
      test('should remove event-binding from eventBindingMap in Context', () => {
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(1);
        removeEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
      });

      test('should remove all event-bindings from eventBindingMap in Context, for given events', () => {
        onEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(3);
        removeEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
      });
    });

    describe('multiple target elements', () => {
      test('should remove event-bindings for each target from eventBindingMap in Context', () => {
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(5);
        removeEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
      });

      test('should remove event-bindings from eventBindingMap in Context, for given events', () => {
        onEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(3 * 5);
        removeEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
      });
    });
  });
});
