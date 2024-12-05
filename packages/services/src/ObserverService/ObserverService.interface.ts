import { ObserverCallback } from './ObserverService.types';

export interface IObserverService {
  observe<T>(key: string, callback: ObserverCallback<T>): void;
  unobserve<T>(key: string, callback: ObserverCallback<T>): void;
  notifyObservers<T>(key: string, data?: T): void;
}
