import { ObserverServiceImpl } from '../ObserverService';

export class ContextState {
  private stateMap: Map<string, any> = new Map();
  private observerService = new ObserverServiceImpl();
  private contextName: string;
  private contextElement: HTMLElement;

  constructor(contextName: string, contextElement: HTMLElement) {
    this.contextName = contextName;
    this.contextElement = contextElement;
  }

  public get name(): string {
    return this.contextName;
  }

  public get element(): HTMLElement {
    return this.contextElement;
  }

  public isMatchingContext(contextName: string, consumingElement: HTMLElement): boolean {
    if (this.contextName !== contextName) return false;

    return this.contextElement.contains(consumingElement);
  }

  public setState<T>(key: string, value: T): void {
    if (this.stateMap.get(key) === value) return;
    this.stateMap.set(key, value);
    this.observerService.notifyObservers(key);
  }

  public getState<T>(key: string): T | undefined {
    return this.stateMap.get(key) as T;
  }

  public observeState(key: string, callback: () => void): void {
    this.observerService.observe(key, callback);
  }

  public unobserveState(key: string, callback: () => void): void {
    this.observerService.unobserve(key, callback);
  }
}
