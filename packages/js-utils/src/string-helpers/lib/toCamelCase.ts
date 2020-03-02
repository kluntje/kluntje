/**
 * function to convert texts to camelCase for example ti generate attribute names
 *
 * @param {string} str - sequence of letters, dashes and spaces to be converted to camelCase
 *
 * @returns {string}
 * @example
 * toCamelCase("some-text") === "someText";
 * toCamelCase("some other text") === "someOtherText";
 */
export function toCamelCase(str: string) {
  return str.toLowerCase().replace(/(-+|\s+)[a-z]/g, txt => txt.toUpperCase()).replace(/(-|\s)+/g, "")
}