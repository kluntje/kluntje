import { IStorageService, StorageType } from '../StorageService';

export interface RequestCacheOptions {
  request: Request;
  response: Response;
  maxAge: number;
  storage: StorageType;
}

export interface RequestCachingServiceConstructorOptions {
  storageService?: IStorageService;
  requestCacheName?: string;
  storageKeyPrefix?: string;
}
