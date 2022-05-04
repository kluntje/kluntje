import URLSearchParamsService from './URLSearchParamsService';

class DebuggerService {
  get debugModeActive() {
    return URLSearchParamsService.get('js-debug') !== null;
  }

  log(message?: any, ...args: any[]) {
    if (this.debugModeActive === false) return;
    console.log(message, ...args);
  }

  warn(message?: any, ...args: any[]) {
    if (this.debugModeActive === false) return;
    console.warn(message, ...args);
  }

  error(message?: any, ...args: any[]) {
    if (this.debugModeActive === false) return;
    console.error(message, ...args);
  }
}

export default new DebuggerService();
