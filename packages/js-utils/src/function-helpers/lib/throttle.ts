type AnyFunction = (...args: unknown[]) => unknown;
type ThrottledFunction<T extends AnyFunction> = T & { cancel: () => void };

/**
 * returns a throttled function which when called, waits the given period of time before passing the last call during this time to the provided callback.
 * call `.cancel()` on the returned function, to cancel the callback invocation.
 *
 *
 * @example
 *   window.addEventListener("resize", throttle(updateSlider, 100));
 *
 * @param {Function} callback - function to be called after the last wait period
 * @param {number} [wait=0] - waiting period in ms before the callback is invoked if during this time the debounced method was not called
 * @returns {Function}
 */
export function throttle<T extends AnyFunction>(callback: T, wait: number = 0): ThrottledFunction<T> {
  let timeoutID: number | undefined = undefined;
  let lastArgs: unknown[] = [];
  const throttledFunction = function throttledFunction(this: unknown, ...args: unknown[]) {
    lastArgs = args;
    if (timeoutID !== undefined) return;
    timeoutID = window.setTimeout(() => {
      timeoutID = undefined;
      callback.call(this, ...lastArgs);
    }, wait);
  };
  throttledFunction.cancel = function cancel() {
    clearTimeout(timeoutID);
    timeoutID = undefined;
  };

  return throttledFunction as ThrottledFunction<T>;
}
