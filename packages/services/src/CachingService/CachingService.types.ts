import { IStorageService } from '../StorageService';

export interface CacheItem {
  validUntil: number;
  value: string;
}

export interface CacheOptions {
  validFor: number;
  storageType?: 'local' | 'session';
}

export interface CachingServiceConstructorOptions {
  storageService?: IStorageService;
  storageKeyPrefix?: string;
}
