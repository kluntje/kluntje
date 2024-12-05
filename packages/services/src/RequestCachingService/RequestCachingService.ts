import DebuggerService from '../DebuggerService';
import { IStorageService, StorageService, StorageType } from '../StorageService';
import { IRequestCachingService } from './RequestCachingService.interface';
import { RequestCacheOptions, RequestCachingServiceConstructorOptions } from './RequestCachingService.types';

export class RequestCachingServiceImpl implements IRequestCachingService {
  private _cache?: Promise<Cache>;

  private storageService: IStorageService = StorageService;
  private requestCacheName = 'kl-request-cache';
  private storageKeyPrefix = 'kl-request-caching-service';

  constructor(options?: RequestCachingServiceConstructorOptions) {
    const { storageService, requestCacheName, storageKeyPrefix } = options ?? {};

    if (storageService !== undefined) {
      this.storageService = storageService;
    }

    if (requestCacheName !== undefined) {
      this.requestCacheName = requestCacheName;
    }

    if (storageKeyPrefix !== undefined) {
      this.storageKeyPrefix = storageKeyPrefix;
    }
  }

  private async getCache(): Promise<Cache | null> {
    try {
      if (this._cache === undefined) {
        this._cache = caches.open(this.requestCacheName);
      }
      return await this._cache;
    } catch (error) {
      DebuggerService.error('RequestCachingService: ', error);
      return null;
    }
  }

  public async getCachedResponse(request: Request, storage?: StorageType) {
    const cache = await this.getCache();
    if (cache === null) return null;

    const response = await cache.match(request);
    if (response === undefined) return null;

    const validUntil = this.storageService.getItem(this.getStorageKey(request.url), { storageType: storage });
    if (validUntil === null) {
      await cache.delete(request);
      return null;
    }

    const now = Date.now();
    if (now > parseInt(validUntil, 10)) {
      await cache.delete(request);
      return null;
    }
    return response;
  }

  public async getCachedJSON<T>(request: Request, storage?: StorageType) {
    const response = await this.getCachedResponse(request, storage);
    if (response === null) return null;
    try {
      return (await response.json()) as T;
    } catch (error) {
      DebuggerService.error('RequestCachingService: ', error);
      return null;
    }
  }

  public async cacheRequest(options: RequestCacheOptions) {
    const { request, response } = options;
    const cache = await this.getCache();
    if (cache === null) return;
    this.storeExpirationTime(options);
    await cache.put(request, response);
  }

  public async clearCachedRequest(request: Request, storage?: StorageType) {
    const cache = await this.getCache();
    if (cache === null) return;
    await cache.delete(request);
    this.storageService.removeItem(this.getStorageKey(request.url), { storageType: storage });
  }

  private storeExpirationTime(options: RequestCacheOptions) {
    const { request, maxAge } = options;
    const validUntil = Date.now() + maxAge;
    this.storageService.addItem(this.getStorageKey(request.url), validUntil.toString(), {
      storageType: options.storage,
    });
  }

  private getStorageKey(key: string) {
    return `${this.storageKeyPrefix}_${key}`;
  }
}

export const RequestCachingService = new RequestCachingServiceImpl();
