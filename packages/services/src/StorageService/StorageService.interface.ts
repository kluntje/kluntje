import { StorageServiceOptions } from './StorageService.types';

export interface IStorageService {
  addItem(storageKey: string, storageValue: string, options?: StorageServiceOptions): void;
  getItem(storageKey: string, options?: StorageServiceOptions): string | null;
  removeItem(storageKey: string, options?: StorageServiceOptions): void;
  observeItem(storageKey: string, callback: () => void): void;
  unobserveItem(storageKey: string, callback: () => void): void;
}
