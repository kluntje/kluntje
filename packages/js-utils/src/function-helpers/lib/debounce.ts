/**
 * returns a debounced function which when called multiple of times each time it waits the waiting duration
 * and if the method was not called during this time, the last call will be passed to the callback.
 *
 * @example
 *   const debounced = debounce(console.log, 500);
 *   debonced("Hi");
 *   debonced("Hello");
 *   debonced("Hey");
 *   if (neverMind) debonced.cancel;
 *   // logs only "Hey"
 *
 *
 *   // or instead of decorator on class methods
 *   Class Component {
 *     constructor() {
 *          window.addEventListener("resize", this.resizeHandler);
 *     }
 *
 *     resizeHandler = throttle(event => {
 *       // event handlers logic
 *     }, 100);
 *   }
 *
 * @param {Function} callback - function to be caled after the last wait period
 * @param {number} [wait=0] - waiting period in ms before the callback is invoked if during this time the debounced method was not called
 * @returns {Function}
 */
export function debounce<T extends Function>(callback: T, wait: number = 0): Function {
  let timeoutID = -1;
  const debouncedFunction = function debouncedFunction(this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => {
      callback.call(this, ...args);
    }, wait);
  };

  debouncedFunction.cancel = function cancel() {
    clearTimeout(timeoutID);
  };
  return debouncedFunction;
}
