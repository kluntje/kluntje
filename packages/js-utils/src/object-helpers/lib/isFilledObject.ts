/**
 * checks if provided argument is an object which has at least one entry in it.
 *
 * @example
 * isFilledObject({ k: "v" }) === true;
 * isFilledObject({}) === false;
 * isFilledObject("text") === false;
 *
 * @export
 * @param {any} obj
 * @returns {boolean}
 */
export function isFilledObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
}
