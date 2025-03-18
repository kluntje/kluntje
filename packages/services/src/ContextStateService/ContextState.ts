import { ObserverServiceImpl } from '../ObserverService';

export class ContextState<StateDefinition extends Record<string, any> = Record<string, any>> {
  private stateMap: Map<keyof StateDefinition, any> = new Map();
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

  public setState<K extends keyof StateDefinition>(key: K, value: StateDefinition[K]): void {
    if (this.stateMap.get(key) === value) return;
    this.stateMap.set(key, value);
    this.observerService.notifyObservers(key as string);
  }

  public getState<K extends keyof StateDefinition>(key: K): StateDefinition[K] | undefined {
    return this.stateMap.get(key);
  }

  public observeState(key: keyof StateDefinition, callback: () => void): void {
    this.observerService.observe(key as string, callback);
  }

  public unobserveState(key: keyof StateDefinition, callback: () => void): void {
    this.observerService.unobserve(key as string, callback);
  }
}
