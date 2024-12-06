import DebuggerService from '../DebuggerService';
import { StorageServiceOptions, StorageService, IStorageService } from '../StorageService';
import { ICachingService } from './CachingService.interface';
import { CacheItem, CacheOptions, CachingServiceConstructorOptions } from './CachingService.types';

export class CachingServiceImpl implements ICachingService {
  private runtimeCache: Map<string, string> = new Map();
  private storageService: IStorageService = StorageService;
  private storageKeyPrefix = 'kl-caching-service';

  constructor(options?: CachingServiceConstructorOptions) {
    const { storageService, storageKeyPrefix } = options ?? {};

    if (storageService !== undefined) {
      this.storageService = storageService;
    }

    if (storageKeyPrefix !== undefined) {
      this.storageKeyPrefix = storageKeyPrefix;
    }
  }

  protected get shouldCache(): boolean {
    return true;
  }

  public cacheValue(key: string, value: string, options: CacheOptions) {
    if (this.shouldCache === false) return;

    if (options.validFor === 0) {
      this.runtimeCache.set(this.getStorageKey(key), value);
      return;
    }

    const cacheItem: CacheItem = {
      value,
      validUntil: Date.now() + options.validFor,
    };

    this.storageService.addItem(
      this.getStorageKey(key),
      JSON.stringify(cacheItem),
      this.getStorageServiceOptions(options),
    );
  }

  public getCachedValue(key: string, cacheOptions?: CacheOptions): string | null {
    if (this.shouldCache === false) return null;

    const storageKey = this.getStorageKey(key);

    const runtimeValue = this.runtimeCache.get(storageKey);

    if (runtimeValue !== undefined) return runtimeValue;

    const cachedItemString = this.storageService.getItem(storageKey, this.getStorageServiceOptions(cacheOptions));
    if (cachedItemString === null) return null;

    try {
      const cachedItem: CacheItem = JSON.parse(cachedItemString);
      if (cachedItem.validUntil < Date.now()) {
        this.storageService.removeItem(storageKey, this.getStorageServiceOptions(cacheOptions));
        return null;
      }

      return cachedItem.value;
    } catch (e) {
      DebuggerService.warn('CachingService: ', e);
      this.storageService.removeItem(storageKey, this.getStorageServiceOptions(cacheOptions));
      return null;
    }
  }

  public getCachedJSON<T>(key: string, cacheOptions?: CacheOptions): T | null {
    const cachedValue = this.getCachedValue(key, cacheOptions);
    if (cachedValue === null) return null;
    try {
      return JSON.parse(cachedValue);
    } catch (error) {
      DebuggerService.error('CachingService: ', error);
      return null;
    }
  }

  public clearCachedValue(key: string, cacheOptions?: CacheOptions) {
    const storageKey = this.getStorageKey(key);

    if (cacheOptions?.validFor === 0) {
      this.runtimeCache.delete(storageKey);
      return;
    }

    this.storageService.removeItem(storageKey, this.getStorageServiceOptions(cacheOptions));
  }

  private getStorageServiceOptions(cacheOptions?: CacheOptions): StorageServiceOptions {
    return {
      storageType: cacheOptions?.storageType,
    };
  }

  private getStorageKey(key: string) {
    return `${this.storageKeyPrefix}_${key}`;
  }
}

export const CachingService = new CachingServiceImpl();
