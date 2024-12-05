import { CacheOptions, ICachingService } from '../CachingService';
import { IRequestCachingService } from '../RequestCachingService';

export interface APIServiceCacheOptions extends CacheOptions {
  forceRefetch?: boolean;
  requestBasedCaching?: boolean;
  cacheKeys?: string[];
}

export interface APIServiceRequestOptions {
  fetchOptions?: RequestInit;
  cacheOptions?: APIServiceCacheOptions;
  throwError?: boolean;
}

export interface APIServiceConstructorOptions {
  cachingService?: ICachingService;
  requestCachingService?: IRequestCachingService;
}

export class APIError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}
