import { appendQueryObject } from "@kluntje/js-utils/lib/url-helpers";

import DebuggerService  from "../DebuggerService";
import { IRequestCachingService, RequestCachingService } from "../RequestCachingService";
import { CachingService, ICachingService } from "../CachingService";

import { APIError, APIServiceCacheOptions, APIServiceConstructorOptions, APIServiceRequestOptions } from "./APIService.types";
import { IAPIService } from "./APIService.interface";

export class APIServiceImpl implements IAPIService {
  private requestPipeline: Map<string, Promise<Response | null>> = new Map();

  private cachingService: ICachingService = CachingService;
  private requestCachingService: IRequestCachingService = RequestCachingService;

  constructor(options: APIServiceConstructorOptions = {}) {
    const { cachingService, requestCachingService } = options;

    if (cachingService !== undefined) this.cachingService = cachingService;
    if (requestCachingService !== undefined) this.requestCachingService = requestCachingService;
  }

  public async fetchJSON<T>(url: string, options: APIServiceRequestOptions = {}): Promise<T | null> {
    // eslint-disable-next-line prettier/prettier
    return await this.fetch(url, APIServiceImpl.getJSON<T>, options);
  }

  public async fetchHTML(url: string, options: APIServiceRequestOptions = {}): Promise<string | null> {
    return await this.fetch(url, APIServiceImpl.getHTML, options);
  }

  private async fetch<T>(
    url: string,
    dataMapper: (response: Response | null) => Promise<T>,
    options: APIServiceRequestOptions = {},
  ): Promise<T | null> {
    const { cacheOptions } = options;

    if (cacheOptions?.forceRefetch === true) {
      this.clearCachedValue(url, cacheOptions);
    }

    const cachedValue = await this.getCachedValue<T>(url, cacheOptions);
    if (cachedValue !== null) return cachedValue;

    try {
      const pipelineRequest = this.requestPipeline.get(url);
      if (pipelineRequest !== undefined) {
        return await dataMapper(await pipelineRequest);
      }

      const request = this.fetchData(url, options);
      this.requestPipeline.set(url, request);

      const response = await request;
      const responseData = await dataMapper(response);
      this.requestPipeline.delete(url);

      if (response === null || responseData === null) return null;

      if (cacheOptions === undefined) return responseData;
      await this.cacheResponse(url, response, responseData, cacheOptions);

      return responseData;
    } catch (error) {
      DebuggerService.error("APIService.fetch: ", error);
      this.requestPipeline.delete(url);
      if (options.throwError === true) throw error;
      return null;
    }
  }

  public async fetchResponse(url: string, options: APIServiceRequestOptions = {}): Promise<Response | null> {
    const { cacheOptions } = options;
    const { forceRefetch = false } = cacheOptions ?? {};

    if (forceRefetch === true) {
      await this.requestCachingService.clearCachedRequest(new Request(url), cacheOptions?.storageType ?? "session");
    }

    const cachedResponse = await this.requestCachingService.getCachedResponse(
      new Request(url),
      cacheOptions?.storageType ?? "session",
    );

    if (cachedResponse !== null) return cachedResponse;

    const pipelineRequest = this.requestPipeline.get(url);

    if (pipelineRequest !== undefined) {
      return await pipelineRequest;
    }

    try {
      const request = fetch(url, options.fetchOptions);
      this.requestPipeline.set(url, request);

      const response = await request;
      this.requestPipeline.delete(url);

      if (cacheOptions === undefined) return response;

      await this.requestCachingService.cacheRequest({
        request: new Request(url),
        response: response.clone(),
        storage: cacheOptions.storageType ?? "session",
        maxAge: cacheOptions.validFor,
      });

      return response;
    } catch (error) {
      DebuggerService.error("APIService.fetchResponse: ", error);

      this.requestPipeline.delete(url);

      if (options.throwError === true) throw error;
      return null;
    }
  }

  private async fetchData(url: string, options: APIServiceRequestOptions): Promise<Response | null> {
    const response = await fetch(url, options.fetchOptions);

    if (!response.ok) throw new APIError(response);
    if (response.status === 204) return null;

    return response;
  }

  private static async getJSON<T>(response: Response | null): Promise<T | null> {
    if (response === null) return null;

    const responseClone = response.clone();
    return await responseClone.json();
  }

  private static async getHTML(response: Response | null): Promise<string | null> {
    if (response === null) return null;

    const responseClone = response.clone();
    return await responseClone.text();
  }

  private async cacheResponse<T>(
    url: string,
    response: Response,
    responseData: T,
    cacheOptions: APIServiceCacheOptions,
  ) {
    const cacheKey = this.getCacheKey(url, cacheOptions);

    if (cacheOptions.requestBasedCaching === true) {
      await this.requestCachingService.cacheRequest({
        request: new Request(cacheKey),
        response,
        storage: cacheOptions.storageType ?? "local",
        maxAge: cacheOptions.validFor,
      });
    } else {
      this.cachingService.cacheValue(cacheKey, JSON.stringify(responseData), cacheOptions);
    }
  }

  private async clearCachedValue(url: string, cacheOptions?: APIServiceCacheOptions) {
    if (cacheOptions === undefined) return;
    const { requestBasedCaching = false } = cacheOptions;
    const cacheKey = this.getCacheKey(url, cacheOptions);

    if (requestBasedCaching === true) {
      await this.requestCachingService.clearCachedRequest(new Request(cacheKey), cacheOptions.storageType);
    }
    this.cachingService.clearCachedValue(cacheKey, cacheOptions);
  }

  private async getCachedValue<T>(url: string, cacheOptions?: APIServiceCacheOptions): Promise<T | null> {
    if (cacheOptions === undefined) return null;
    const { requestBasedCaching = false } = cacheOptions;

    const cacheKey = this.getCacheKey(url, cacheOptions);
    if (requestBasedCaching === true) {
      return await this.requestCachingService.getCachedJSON(new Request(cacheKey), cacheOptions.storageType);
    }
    return this.cachingService.getCachedJSON(cacheKey, cacheOptions);
  }

  private getCacheKey(url: string, cacheOptions?: APIServiceCacheOptions): string {
    const cacheKeys = cacheOptions?.cacheKeys ?? [];
    if (cacheKeys.length === 0) return url;
    return appendQueryObject(url, { klCacheKeys: cacheKeys.join("_") });
  }
}

export const APIService = new APIServiceImpl();
