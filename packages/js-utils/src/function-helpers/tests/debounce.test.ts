import { debounce } from '../lib/debounce';

jest.useFakeTimers();

test('(debounce) should call the callback once when debounced method is called multiple times', () => {
  const callback = jest.fn();
  const debounced = debounce(callback, 100);
  debounced('first call');
  debounced('last call');

  expect(callback).not.toBeCalled();
  jest.runAllTimers();
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('last call');
});

test('(debounce) should call the callback not before the given waitiing period is past', () => {
  const callback = jest.fn();
  const debounced = debounce(callback, 100);

  debounced('first call');
  debounced('last call');

  // check before the timeout has expired
  jest.advanceTimersByTime(50);
  expect(callback).not.toBeCalled();
  // check after the wait duration
  jest.advanceTimersByTime(51);
  expect(callback).toHaveBeenCalledWith('last call');
});
