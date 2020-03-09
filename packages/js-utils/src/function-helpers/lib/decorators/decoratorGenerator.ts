/**
 * generates a decorator factory for the provided helper function.
 * helper function should have this signature: `(Function, ...args: any[]) => Function`
 *
 * @export
 * @param {Function} func - function to be wrapped with a decorator factory
 * @returns {Function}
 */
export function decoratorGenerator(func: Function): Function {
  // arguments passed to the decorator
  return function (...args: any[]) {
    return function decorator(_proto: any, _methodName: string, descriptor: PropertyDescriptor) {
      return {
        ...descriptor,
        value: func(descriptor.value, ...args),
      }
    }
  }
}
