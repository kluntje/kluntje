/**
 * converts the provided string to a kebab case (kebab.case)
 * @example
 *   toKebabCase("keyValuePair") === "key-value-pair"
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function toKebabCase(str: string): string {
  // from https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2659294
  return (
    str
      // get all lowercase letters that are near to uppercase ones
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // replace all spaces and low dash
      .replace(/[\s_]+/g, "-")
      // convert to lower case
      .toLowerCase()
  );
}
