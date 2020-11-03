/**
 * returns a promise which resolves after the animationend event
 *
 * @param {HTMLElement|SVGElement} el - DOM Element which has the css animation
 * @param {string} [animationName] - keyframes' name. e.g. "slideOut"
 * @returns {Promise}
 */
export function waitForAnimationEnd(el: HTMLElement, animationName?: string): Promise<AnimationEvent> {
  return new Promise((resolve, _reject) => {
    el.addEventListener<'animationend'>('animationend', function callBack(e: AnimationEvent) {
      // if animationName is given then ignore animation for other keyframes
      if (animationName && e.animationName !== animationName) {
        return;
      }
      // unbind the event listener
      el.removeEventListener('animationend', callBack);
      // resolve promise with the transitionend event as its argument
      resolve(e);
    });
  });
}
