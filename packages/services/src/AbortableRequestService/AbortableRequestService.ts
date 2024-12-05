import DebuggerService from '../DebuggerService';
import { APIService, APIServiceRequestOptions, IAPIService } from '../APIService';
import {
  AbortableRequestServiceConstructorOptions,
  AbortableRequestServiceOptions,
} from './AbortableRequestService.types';

export class AbortableRequestService {
  private abortController = new AbortController();
  private abortOptions: AbortableRequestServiceOptions | null = null;
  private latestOptions: AbortableRequestServiceOptions | null = null;

  protected apiService: IAPIService = APIService;

  constructor(options: AbortableRequestServiceConstructorOptions = {}) {
    const { apiService } = options;

    if (apiService !== undefined) this.apiService = apiService;
  }

  public async fetchJSON<T>(options: AbortableRequestServiceOptions): Promise<T | null> {
    return await this.makeAbortableRequest<T>(options, this.apiService.fetchJSON.bind(this.apiService));
  }

  public async fetchResponse(options: AbortableRequestServiceOptions): Promise<Response | null> {
    return await this.makeAbortableRequest<Response>(options, this.apiService.fetchResponse.bind(this.apiService));
  }

  private async makeAbortableRequest<R>(
    options: AbortableRequestServiceOptions,
    fetcher: (url: string, options: APIServiceRequestOptions) => Promise<R | null>,
  ): Promise<R | null> {
    if (this.latestOptions !== null) {
      this.abortOptions = options;
      this.abortController.abort();
      this.abortController = new AbortController();
    }

    this.latestOptions = options;

    try {
      const response = await fetcher(options.url, {
        cacheOptions: options.options?.cacheOptions,
        throwError: true,
        fetchOptions: {
          ...options.options?.fetchOptions,
          signal: this.abortController.signal,
        },
      });
      this.latestOptions = null;
      return response;
    } catch (error: any) {
      DebuggerService.error('AbortableRequestService.makeAbortableRequest: ', error);

      if (error.name === 'AbortError') return this.handleAbortError<R>(this.fetchJSON.bind(this));

      if (options.options?.throwError === true) throw error;

      return null;
    }
  }

  private async handleAbortError<R>(
    nextAction: (options: AbortableRequestServiceOptions) => Promise<R | null>,
  ): Promise<R | null> {
    const latestOptions = this.latestOptions || this.abortOptions;
    if (latestOptions === null) return null;
    this.abortOptions = null;
    this.latestOptions = null;
    return nextAction(latestOptions);
  }
}
