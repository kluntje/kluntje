import { waitForEvent } from "./waitForEvent";

interface Component extends HTMLElement {
  state: any;
}

/**
 * Promise that resolves, when the given component is initialized
 * @param {Component} component
 * @returns {Promise<void>}
 * @example
 * waitForInitialization(my-input).then(() => my-input.value = 'Hello World');
 * @example
 * await  waitForInitialization(my-input);
 * my-input.value = 'Hello World';
 */
export const waitForInitialization = async <T extends Component>(component: T) => {
  if (component.state?.initialized === true) return;
  return await waitForEvent(component, "kl-component-initialized", 3000);
};
