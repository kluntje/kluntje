export class URLSearchParamsService {
  private urlSearchParams: URLSearchParams = new URLSearchParams(window.location.search);

  public get(param: string): string | null {
    return this.urlSearchParams.get(param);
  }

  public getAll(param: string): string[] | null {
    return this.urlSearchParams.getAll(param);
  }

  public set(param: string, value: string): void {
    this.urlSearchParams.set(param, value);
    this.updateUrl();
  }

  public delete(param: string): void {
    this.urlSearchParams.delete(param);
    this.updateUrl();
  }

  public getString(): string {
    return this.urlSearchParams.toString();
  }

  public get curUrl() {
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  }

  private updateUrl() {
    const curQueryString = this.getString();
    const curUrl = this.curUrl;
    const hashCache = window.location.hash;
    const newUrl = curQueryString !== '' ? `${curUrl}?${curQueryString}` : curUrl;
    window.history.replaceState({ path: newUrl }, '', newUrl);
    window.location.hash = hashCache;
  }
}

export default new URLSearchParamsService();
