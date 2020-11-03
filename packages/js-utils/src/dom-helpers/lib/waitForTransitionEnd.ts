/**
 * returns a promise which resolves after the `transitionend` event
 *
 * @param {HTMLElement|SVGElement} el - DOM Element which has the css transition
 * @param {string} [propertyName] - transition's propertyName. e.g. "width"
 * @returns {Promise}
 * @async
 */
export function waitForTransitionEnd(el: HTMLElement, propertyName?: string): Promise<TransitionEvent> {
  return new Promise((resolve, _reject) => {
    el.addEventListener<'transitionend'>('transitionend', function callBack(e: TransitionEvent) {
      // if propertyName is given then ignore trasnition on other properties
      if (propertyName && e.propertyName !== propertyName) {
        return;
      }
      // unbind the event listener
      el.removeEventListener('transitionend', callBack);
      // resolve promise with the transitionend event as its argument
      resolve(e);
    });
  });
}
