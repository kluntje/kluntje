import { IObserverService } from './ObserverService.interface';
import { ObserverCallback } from './ObserverService.types';

export class ObserverServiceImpl implements IObserverService {
  private observerMap: Map<string, Set<ObserverCallback>> = new Map();

  public observe(observedKey: string, callback: ObserverCallback) {
    const curCallbacks = this.getCallbacks(observedKey);
    curCallbacks.add(callback);
    this.observerMap.set(observedKey, curCallbacks);
  }

  public unobserve(observedKey: string, callback: ObserverCallback) {
    const curCallbacks = this.getCallbacks(observedKey);
    curCallbacks.delete(callback);
    this.observerMap.set(observedKey, curCallbacks);
  }

  public notifyObservers<T>(observedKey: string, data?: T) {
    const callbacks = this.getCallbacks(observedKey);
    callbacks.forEach((callback) => callback(data));
  }

  private getCallbacks(observedKey: string): Set<ObserverCallback> {
    return this.observerMap.get(observedKey) || new Set();
  }
}

export const ObserverService = new ObserverServiceImpl();
