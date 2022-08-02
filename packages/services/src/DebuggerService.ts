import URLSearchParamsService from './URLSearchParamsService';

function debugModeActive() {
  return URLSearchParamsService.get('js-debug') !== null;
}

const handler = {
  get(target: Console, prop: keyof Console) {
    if (debugModeActive()) return target[prop];
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    else return () => {};
  },
};

export default new Proxy(console, handler);
