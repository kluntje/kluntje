/**
 * returns a deep link of the provided argument
 * @param {any} arg
 * @return {any}
 */

export const naiveClone = (arg: any) :any => {
  if (typeof arg !== 'object') {
    return arg;
  }

  let result: any; // could be Object, null or any kind of Array

  if (arg === null) {
    result = null;
  }
  else if (Array.isArray(arg)) {
    result = [];
    for (let i = 0; i < arg.length; i++) {
      result.push(naiveClone(arg[i]));
    }
  }
  else {
    result = {};
    for (const key in arg) {
      if (arg.hasOwnProperty(key)) {
        result[key] = naiveClone(arg[key]);
      }
    }
  }

  return result;
};
