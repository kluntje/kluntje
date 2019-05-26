import { toString } from './toString';

/**
 * compare two arguments, for object their toString values are compared
 * @param {*} arg1
 * @param {*} arg2
 * @returns {boolean}
 */
export const isEqual = (arg1: any, arg2: any): boolean => {
  if (typeof arg1 !== typeof arg2) {
    return false;
  }
  if (typeof arg1 === 'object') {
    return toString(arg1).localeCompare(toString(arg2)) === 0;
  }
  return arg1 === arg2;
};
