/**
 * returns nested value without throwing an error if the parent doesn't exist
 * @param {Object} obj - object to be looked for value
 * @param {string} path - a string with dot separated levels: e.g "a.b"
 * @returns {*} - returned the found value or undefined
 *
 * @example
 *     const obj = {
 *       a: {
 *         b: {
 *           c: 1
 *         },
 *         d: true
 *       }
 *     };
 *     getValue(obj, "a.b") === {c: 1};
 *     getValue(obj, "a.f") === undefined;
 */
export const getValue = <T = any>(obj: Object = {}, path = ''): T | undefined => {
  const objPath = path.split('.');
  let level = 0;
  let resultObj: any = obj;
  while (resultObj && level < objPath.length) {
    resultObj = resultObj[objPath[level]];
    level++;
  }
  return resultObj;
};
