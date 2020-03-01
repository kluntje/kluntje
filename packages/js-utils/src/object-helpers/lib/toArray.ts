/**
 * returns the argument wrapped in an array if it isn't array itself
 * @param {T | Array<T>} arg
 * @returns {Array<T>}
 * @example
 * const apple = "Apple";
 * const fruits = toArray(apple); // ["Apple"] 
 */
export const toArray = <T>(arg: T | Array<T>): Array<T> => {
  return Array.isArray(arg) ? arg : [arg];
};
