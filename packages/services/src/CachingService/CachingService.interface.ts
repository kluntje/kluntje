import { CacheOptions } from './CachingService.types';

export interface ICachingService {
  cacheValue(key: string, value: string, options: CacheOptions): void;
  getCachedValue(key: string, cacheOptions?: CacheOptions): string | null;
  getCachedJSON<T>(key: string, cacheOptions?: CacheOptions): T | null;
  clearCachedValue(key: string, cacheOptions?: CacheOptions): void;
}
