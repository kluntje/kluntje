
/**
 * Converts an object to URLSearchParams.
 * @param obj Object to convert.
 * @param prefix Prefix to add to all keys.
 * @returns URLSearchParams.
 * 
 * @example
 * const obj = { q: 'hello', t: 'world' };
 * const result = objectToSearchParams(obj);
 * 
 * console.log(result.toString());
 * // => 'q=hello&t=world'
 */
export const objectToSearchParams = (obj: Record<string, string | undefined>, prefix = "") => {
  const searchParams = new URLSearchParams();

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== undefined) searchParams.append(`${prefix}${key}`, value);
  });

  return searchParams;
};
