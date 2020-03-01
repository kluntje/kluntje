import { toString } from './toString';

/**
 * compare two arguments, for object their toString values are compared
 * @param {T} arg1
 * @param {T} arg2
 * @returns {boolean}
 * @example
 * if (!isEqual(oldState, newState)) console.log('state changed');
 */
export const isEqual = <T>(arg1: T, arg2: T): boolean => {
  if (typeof arg1 !== typeof arg2) {
    return false;
  }
  if (typeof arg1 === 'object') {
    return toString(arg1).localeCompare(toString(arg2)) === 0;
  }
  return arg1 === arg2;
};
