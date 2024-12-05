import { APIServiceRequestOptions } from './APIService.types';

export interface IAPIService {
  fetchJSON<T>(url: string, options?: APIServiceRequestOptions): Promise<T | null>;
  fetchHTML(url: string, options?: APIServiceRequestOptions): Promise<string | null>;
  fetchResponse(url: string, options?: APIServiceRequestOptions): Promise<Response | null>;
}
