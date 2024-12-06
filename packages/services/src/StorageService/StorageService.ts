import { IStorageService } from './StorageService.interface';
import { StorageServiceOptions, StorageType } from './StorageService.types';

export class StorageServiceImpl implements IStorageService {
  private observedItemsMap: Map<string, Set<() => void>> = new Map();

  constructor() {
    window.addEventListener('storage', (e) => this.handleStorageChange(e));
  }

  public addItem(storageKey: string, storageValue: string, options: StorageServiceOptions = {}) {
    this.getStorage(options).setItem(storageKey, storageValue);
    this.fireCallbacks(storageKey);
  }

  public getItem(storageKey: string, options: StorageServiceOptions = {}): string | null {
    return this.getStorage(options).getItem(storageKey);
  }

  public removeItem(storageKey: string, options: StorageServiceOptions = {}) {
    this.getStorage(options).removeItem(storageKey);
  }

  public observeItem(storageKey: string, callback: () => void) {
    const keyCallbacks = this.getKeyCallbacks(storageKey);
    keyCallbacks.add(callback);
    this.observedItemsMap.set(storageKey, keyCallbacks);
  }

  public unobserveItem(storageKey: string, callback: () => void) {
    const keyCallbacks = this.getKeyCallbacks(storageKey);
    keyCallbacks.delete(callback);
    this.observedItemsMap.set(storageKey, keyCallbacks);
  }

  public clearStorage(storageType: StorageType) {
    this.getStorage({ storageType }).clear();
  }

  private handleStorageChange(e: StorageEvent) {
    const storageKey = e.key;
    const oldValue = e.oldValue;
    const newValue = e.newValue;
    if (storageKey === null || oldValue === newValue || !this.observedItemsMap.has(storageKey)) return;

    this.fireCallbacks(storageKey);
  }

  private getKeyCallbacks(storageKey: string): Set<() => void> {
    return this.observedItemsMap.get(storageKey) || new Set();
  }

  private fireCallbacks(storageKey: string) {
    const callbacks = this.getKeyCallbacks(storageKey);
    callbacks.forEach((callback) => callback());
  }

  private getStorage(options: StorageServiceOptions): Storage {
    const { storageType = 'local' } = options;
    return storageType === 'local' ? localStorage : sessionStorage;
  }
}

export const StorageService = new StorageServiceImpl();
