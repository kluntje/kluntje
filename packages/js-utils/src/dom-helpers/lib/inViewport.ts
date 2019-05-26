
/**
 * checks, whether a element is in the Viewport
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @returns {boolean}
 */
export const inViewport = (element:HTMLElement, parent?: HTMLElement): boolean => {
  const elPosition = element.getBoundingClientRect();
  let parentPosition = {
    top: 0,
    right: (window.innerWidth || document.documentElement.clientWidth),
    bottom: (window.innerHeight || document.documentElement.clientHeight),
    left: 0,
  };

  if (parent !== undefined) {
    parentPosition = parent.getBoundingClientRect();
  }

  return (
    elPosition.top >= parentPosition.top &&
    elPosition.right <= parentPosition.right &&
    elPosition.bottom <= parentPosition.bottom &&
    elPosition.left >= parentPosition.left
  );
};
