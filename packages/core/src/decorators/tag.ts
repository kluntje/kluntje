/**
 * decorator to define a Custom Element for the given tagName
 *
 * @export
 * @param {string} tagName - name of the custom element. e.g. "py-button"
 * @example
 * ```js
 *    @tag("my-button")
 *    class MyButton extends Component{
 *    }
 * ```
 * @returns {Function}
 */
export default function tag(tagName: string): Function {
  return function<T extends { new (): HTMLElement }>(ComponentClass: T) {
    customElements.define(tagName, ComponentClass);

    return ComponentClass;
  };
}
