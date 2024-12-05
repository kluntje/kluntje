import { StorageType } from '../StorageService';
import { RequestCacheOptions } from './RequestCachingService.types';

export interface IRequestCachingService {
  getCachedResponse(request: Request, storage?: StorageType): Promise<Response | null>;
  getCachedJSON<T>(request: Request, storage?: StorageType): Promise<T | null>;
  cacheRequest(options: RequestCacheOptions): Promise<void>;
  clearCachedRequest(request: Request, storage?: StorageType): Promise<void>;
}
