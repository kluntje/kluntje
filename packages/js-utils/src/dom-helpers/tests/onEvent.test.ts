import { onEvent } from '..';

describe('onEvent tests:', () => {
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
    spyOn(mockTarget, 'addEventListener').and.callThrough();
    spyOn(mockTargets[0], 'addEventListener').and.callThrough();
    spyOn(mockTargets[1], 'addEventListener').and.callThrough();
    spyOn(mockTargets[2], 'addEventListener').and.callThrough();
    spyOn(mockTargets[3], 'addEventListener').and.callThrough();
    spyOn(mockTargets[4], 'addEventListener').and.callThrough();
    spyOn(mockContext, 'mockHandler');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('eventListener tests:', () => {
    describe('no target element', () => {
      test('should not try to add eventListener', () => {
        onEvent(null, 'click', mockContext.mockHandler, mockContext);
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('click'));
        expect(mockContext.mockHandler).not.toBeCalled();
      });
    });

    describe('single target element', () => {
      test('should add eventListener to target', () => {
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(mockTarget.addEventListener).toBeCalled();
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('click'));
        expect(mockContext.mockHandler).toBeCalled();
      });

      test('should add listeners for all events in space separeted string', () => {
        onEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(mockTarget.addEventListener).toBeCalledTimes(3);
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('click'));
        mockTarget.dispatchEvent(new Event('touchstart'));
        mockTarget.dispatchEvent(new Event('touchend'));
        expect(mockContext.mockHandler).toBeCalledTimes(3);
      });

      test('should add listeners for all events given in Array<string>', () => {
        onEvent(mockTarget, ['mouseenter', 'mouseleave'], mockContext.mockHandler, mockContext);
        expect(mockTarget.addEventListener).toBeCalledTimes(2);
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTarget.dispatchEvent(new Event('mouseenter'));
        mockTarget.dispatchEvent(new Event('mouseleave'));
        expect(mockContext.mockHandler).toBeCalledTimes(2);
      });
    });

    describe('multiple target elements', () => {
      test('should add eventListener to target', () => {
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(curTarget.addEventListener).toBeCalled());
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTargets.forEach((curTarget) => curTarget.dispatchEvent(new Event('click')));
        expect(mockContext.mockHandler).toBeCalledTimes(5);
      });

      test('should add listeners for all events in space separeted string', () => {
        onEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(curTarget.addEventListener).toBeCalledTimes(3));
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTargets.forEach((curTarget) => {
          curTarget.dispatchEvent(new Event('click'));
          curTarget.dispatchEvent(new Event('touchstart'));
          curTarget.dispatchEvent(new Event('touchend'));
        });
        expect(mockContext.mockHandler).toBeCalledTimes(3 * 5);
      });

      test('should add listeners for all events given in Array<string>', () => {
        onEvent(mockTargets, ['mouseenter', 'mouseleave'], mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(curTarget.addEventListener).toBeCalledTimes(2));
        expect(mockContext.mockHandler).not.toBeCalled();
        mockTargets.forEach((curTarget) => {
          curTarget.dispatchEvent(new Event('mouseenter'));
          curTarget.dispatchEvent(new Event('mouseleave'));
        });
        expect(mockContext.mockHandler).toBeCalledTimes(2 * 5);
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
      test('should add new objects for target, handler and context to eventIdMap', () => {
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(mockContext.eventIdMap.has(mockTarget)).toBe(true);
        expect(mockContext.eventIdMap.has(mockContext.mockHandler)).toBe(true);
        // @ts-ignore
        expect(mockContext.eventIdMap.has(mockContext)).toBe(true);
      });

      test('should not add multiple new objects for the same target, handler and context to eventIdMap, if multiple events are provided', () => {
        onEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(mockContext.eventIdMap.has(mockTarget)).toBe(true);
        expect(mockContext.eventIdMap.has(mockContext.mockHandler)).toBe(true);
        // @ts-ignore
        expect(mockContext.eventIdMap.has(mockContext)).toBe(true);
      });

      test('should add new event-binding to eventBindingMap in Context', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(1);
      });

      test('should add not add the same event-binding twice to eventBindingMap in Context', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        onEvent(mockTarget, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(1);
      });

      test('should add new event-binding to eventBindingMap in Context, for each given event', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(mockTarget, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(3);
      });
    });

    describe('multiple target elements', () => {
      test('should add new objects for all targets, handler and context to eventIdMap', () => {
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(mockContext.eventIdMap.has(curTarget)).toBe(true));
        expect(mockContext.eventIdMap.has(mockContext.mockHandler)).toBe(true);
        // @ts-ignore
        expect(mockContext.eventIdMap.has(mockContext)).toBe(true);
      });

      test('should not add multiple new objects for the same target, handler and context to eventIdMap, if multiple events are provided', () => {
        onEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        mockTargets.forEach((curTarget) => expect(mockContext.eventIdMap.has(curTarget)).toBe(true));
        expect(mockContext.eventIdMap.has(mockContext.mockHandler)).toBe(true);
        // @ts-ignore
        expect(mockContext.eventIdMap.has(mockContext)).toBe(true);
      });

      test('should add new event-binding for each target to eventBindingMap in Context', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(5);
      });

      test('should add not add the same event-binding twice to eventBindingMap in Context', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        onEvent(mockTargets, 'click', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(5);
      });

      test('should add new event-binding to eventBindingMap in Context, for each given event', () => {
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(0);
        onEvent(mockTargets, 'click touchstart touchend', mockContext.mockHandler, mockContext);
        expect(Object.keys(mockContext.eventBindingMap).length).toBe(3 * 5);
      });
    });
  });
});
