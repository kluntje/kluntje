import { APIServiceRequestOptions, IAPIService } from '../APIService';

export interface AbortableRequestServiceOptions {
  url: string;
  options?: APIServiceRequestOptions;
}

export interface AbortableRequestServiceConstructorOptions {
  apiService?: IAPIService;
}
