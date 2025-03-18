import { ContextState } from './ContextState';

export interface IContextStateService {
  getContextState<StateDefinition extends Record<string, any>>(
    contextName: string,
    consumingElement: HTMLElement,
  ): Promise<ContextState<StateDefinition>>;

  createContextState<StateDefinition extends Record<string, any>>(
    contextName: string,
    contextElement: HTMLElement,
  ): ContextState<StateDefinition>;
}
