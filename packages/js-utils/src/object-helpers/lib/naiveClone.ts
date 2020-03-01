import { Nullable } from "../../types/Nullable";

export function naiveClone<T>(arg: Array<T>): Array<T>;

export function naiveClone<T>(arg: T): T;

/**
 * returns a deep link of the provided argument
 * @param {Nullable<T> | Array<T>} arg
 * @returns {Nullable<T> | Array<T>}
 * @example
 * const state = naiveClone(initialState);
 */
export function naiveClone<T>(arg: Nullable<T> | Array<T>): Nullable<T> | Array<T> {
  if (typeof arg !== 'object') {
    return arg;
  }

  if (arg === null) {
    return null;
  }

  if (Array.isArray(arg)) {
    return arg.map(a => naiveClone(a));
  }

  return Object.entries(arg).reduce((result, [key, value]) => {
    result[key] = naiveClone(value);
    return result;
  }, {} as any);
};
