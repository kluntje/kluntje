/**
 * returns a deep clone of the provided argument. supports any primitive types, arrays, sets, maps, dates which can also be deeply nested in an object.
 * @param {T} arg
 * @returns {T}
 * @example
 * const state = naiveClone({a: {b: 123, c: false}});
 */
export function naiveClone<T>(arg: T): T {
  if (typeof arg !== 'object' || arg === null) {
    return arg;
  }
  else if (Array.isArray(arg)) {
    return arg.map(a => naiveClone(a)) as unknown as T;
  }
  else if (arg instanceof Set) {
    return new Set(naiveClone(Array.from(arg))) as unknown as T;
  }
  else if (arg instanceof Map) {
    return new Map(naiveClone(Array.from(arg))) as unknown as T;
  }
  else if (arg instanceof Date) {
    return new Date(arg) as unknown as T;
  }

  return Object.fromEntries(Object.entries(arg).map(([k, v]) => [k, naiveClone(v)])) as unknown as T;
};
