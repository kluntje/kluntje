import { ContextState } from './ContextState';
import { ObserverServiceImpl } from '../ObserverService';
import { IContextStateService } from './ContextStateService.interface';

export class ContextStateServiceImpl implements IContextStateService {
  private contextStateMap: Map<string, ContextState[]> = new Map();
  private contextInitObserver = new ObserverServiceImpl();

  private getMatchingContextState(contextName: string, consumingElement: HTMLElement): ContextState | null {
    const contextList = this.contextStateMap.get(contextName) || [];
    const matchingContexts = contextList.filter((context) => context.isMatchingContext(contextName, consumingElement));
    if (matchingContexts.length === 0) return null;
    return matchingContexts[0];
  }

  public getContextState<StateDefinition extends Record<string, any>>(
    contextName: string,
    consumingElement: HTMLElement,
  ): Promise<ContextState<StateDefinition>> {
    const matchingContextState = this.getMatchingContextState(contextName, consumingElement);
    if (matchingContextState) return Promise.resolve(matchingContextState) as Promise<ContextState<StateDefinition>>;
    return new Promise<ContextState<StateDefinition>>((resolve) => {
      this.contextInitObserver.observe(contextName, () => {
        const contextState = this.getMatchingContextState(contextName, consumingElement);
        if (contextState) {
          resolve(contextState as ContextState<StateDefinition>);
        }
      });
    });
  }

  public createContextState<StateDefinition extends Record<string, any>>(
    contextName: string,
    contextElement: HTMLElement,
  ): ContextState<StateDefinition> {
    const contextState = new ContextState(contextName, contextElement);
    const contextList = this.contextStateMap.get(contextName) || [];
    contextList.push(contextState);
    this.contextStateMap.set(contextName, contextList);
    this.contextInitObserver.notifyObservers(contextName);
    return contextState as ContextState<StateDefinition>;
  }
}

export const ContextStateService = new ContextStateServiceImpl();
