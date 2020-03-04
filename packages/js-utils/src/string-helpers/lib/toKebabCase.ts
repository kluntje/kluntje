/**
 * converts the provided string to a kebab case (kebab-case)
 * @example
 *   toKebabCase("keyValuePair") === "key-value-pair"
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match: string) => `-${match.toLocaleLowerCase()}`);
}
