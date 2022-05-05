function getExtendedType(arg: unknown) {
  if (typeof arg !== "object") return typeof arg;
  if (arg === null) return "null";
  if (Array.isArray(arg)) return "array";
  if (arg instanceof Set) return "set";
  if (arg instanceof Map) return "map";
  if (arg instanceof Date) return "date";
  return "object";
}

function equalArrays(arg1: Array<unknown>, arg2: Array<unknown>) {
  if (arg1.length !== arg2.length) return false;

  return arg1.every((item, ix) => isEqual(item, arg2[ix]));
}

// currently the order of items matter in the comparison
function equalSets(arg1: Set<unknown>, arg2: Set<unknown>) {
  return equalArrays(Array.from(arg1), Array.from(arg2));
}

// currently the order of items matter in the comparison
function equalMaps(arg1: Map<unknown, unknown>, arg2: Map<unknown, unknown>) {
  return equalArrays(Array.from(arg1), Array.from(arg2));
}

function equalDates(arg1: Date, arg2: Date) {
  return arg1.getTime() === arg2.getTime();
}

function equalRecords(arg1: Record<string|symbol, unknown>, arg2: Record<string|symbol, unknown>) {
  return equalArrays(Object.entries(arg1), Object.entries(arg2));
}

/**
 * compare two arguments, for object their toString values are compared
 * @param {*} arg1
 * @param {*} arg2
 * @returns {boolean}
 * @example
 * if (!isEqual(oldState, newState)) console.log('state changed');
 */
export const isEqual = (arg1: unknown, arg2: unknown): boolean => {
  const arg1Type = getExtendedType(arg1);
  const arg2Type = getExtendedType(arg2);

  if (arg1Type !== arg2Type) {
    return false;
  }

  // primitives
  if (typeof arg1 !== 'object') {
    return arg1 === arg2;
  }

  // reference to the same object
  if (arg1 === arg2) return true;

  // one is null, and the other one wasn't obviously the same on the last step
  if (arg1 === null || arg2 === null) return false;

  if (arg1Type === "array") {
    return equalArrays(arg1 as Array<unknown>, arg2 as Array<unknown>);
  }

  if (arg1Type === "set") {
    return equalSets(arg1 as Set<unknown>, arg2 as Set<unknown>);
  }

  if (arg1Type === "map") {
    return equalMaps(arg1 as Map<unknown, unknown>, arg2 as Map<unknown, unknown>);
  }

  if (arg1Type === "date") {
    return equalDates(arg1 as Date, arg2 as Date);
  }

  // based on object literals
  return equalRecords(arg1 as Record<string|symbol, unknown>, arg2 as Record<string|symbol, unknown>);
};
