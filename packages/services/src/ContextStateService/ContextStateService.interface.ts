import { ContextState } from './ContextState';

export interface IContextStateService {
  getContextState(contextName: string, consumingElement: HTMLElement): Promise<ContextState>;
  createContextState(contextName: string, contextElement: HTMLElement): ContextState;
}
