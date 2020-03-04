/**
 * returns a throttled function which when called, waits the given period of time before passing the last call during this time to the provided callback.
 * call `.cancel()` on the returned function, to cancel the callback invokation.
 *
 *
 * @example
 *   window.addEventListener("resize", throttle(updateSlider, 100));
 *
 * @param {Function} callback - function to be caled after the last wait period
 * @param {number} [wait=0] - waiting period in ms before the callback is invoked if during this time the debounced method was not called
 * @returns {Function}
 */
export function throttle<T extends Function>(callback: T, wait: number = 0): (args?: any) => void {
  let timeoutID: number | undefined = undefined;
  let lastArgs: any[] = [];
  const throttledFunction = function throttledFunction(this: any, ...args: any[]) {
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

  return throttledFunction;
}
