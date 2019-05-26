import { removeMultiBS } from './removeMultiBS';
import { removeAllNL } from './removeAllNL';

/**
 * removes all multi Whitespaces and Newlines in given string
 * @param {string} inputString
 * @returns {string}
 */
export const getCleanString = (inputString: string): string => {
  return removeAllNL(removeMultiBS(inputString));
};
