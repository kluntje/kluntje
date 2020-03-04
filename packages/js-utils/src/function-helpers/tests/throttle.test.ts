import { throttle } from '../lib/throttle';

jest.useFakeTimers();

test('(throttle) should call the callback once when throttled method is called multiple times', () => {
  const callback = jest.fn();
  const throttled = throttle(callback, 100);
  throttled('first call');
  throttled('last call');

  expect(callback).not.toBeCalled();
  jest.runAllTimers();
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('last call');
});

test('(throttle) should call the callback when the given waitiing period is past', () => {
  const callback = jest.fn();
  const throttled = throttle(callback, 100);

  throttled('first call');
  throttled('second call');

  // check before the timeout has expired
  jest.advanceTimersByTime(50);
  expect(callback).not.toBeCalled();
  // check after the wait duration
  jest.advanceTimersByTime(51);
  // call again but the first timeout should be expired and the callback called
  throttled('last call');
  expect(callback).toHaveBeenCalledWith('second call');
  // next tick, callback should be called a second time
  jest.advanceTimersByTime(101);
  expect(callback).toHaveBeenCalledWith('last call');
});
