import { fetchJSON } from '@kluntje/js-utils/lib/api-helpers';
import { isFilledObject } from '@kluntje/js-utils/lib/object-helpers';

const resolveSymbol = Symbol('resolve');
const rejectSymbol = Symbol('reject');
const pendingSymbol = Symbol('pending');

// Promise but with options to resolve/reject from outside
interface ExtendedPromise<T> extends Promise<T> {
  [resolveSymbol]: Function;
  [rejectSymbol]: Function;
  [pendingSymbol]: boolean;
}

/**
 * A service to provide sync/async way to provide internationalization values.
 * With i18n values beeing able to have variable placeholder in them. indexd for arrays e.g. `{0}` or named for objects e.g. `{hour}`
 *
 * @example
 * import { I18nService } from "@kluntje/services";
 * // get singleton instance
 * const i18nService = I18nService.getInstance();
 * // provide the url to fetch the dictionary
 * i18nService.setUp({url: "path/to/i18n/ajax/service"});
 * // or provide the dictionary itself
 * // i18nService.setUp({dictionary: {"com.page.filter.notifications": "{0} Nachrichten", ...}});
 * const i18n = i18nService.get;
 * // use API
 * // render markup with i18n value, if the i18n key hasn't been fetched jet, a placeholder `<span class"kl-i18n-placeholder"></span>` will be rendered,
 * // with the provided `fallback` text. or the last part of the key.
 * // this `span` will be replaced with the i18n value in den DOM after the keys where successfully fetched from the server
 * render(html`<button>${i18n("com.page.filter.notifications", {fallback: "Info", interpolations: [7]})}</button>`, el);
 * // if any actions needs the keys to be ready and shouldn't be replace later in the DOM, the `ready` accessor can be called.
 * // this will automatically trigger the fetch for the keys from the server
 * await i18nService.ready;
 * // the boolean `loaded` can be used to check if the keys have been fetched form the server. This will not trigger the fetch.
 * if (i18nService.loaded) console.log(i18nService.get("com.page.filter.submitLabel"))
 *
 * @export
 * @class I18nService
 */
export class I18nService {
  /**
   * class name for the `span`s being used as placeholder for i18n values in the DOM before the actual values have been fetched from the server
   *
   * @readonly
   * @static
   * @memberof I18nService
   */
  static get PLACEHOLDER_SELECTOR() {
    return 'kl-i18n-placeholder';
  }

  private static _instance?: I18nService;

  /**
   * returns the singleton instance of the I18nService
   *
   * @static
   * @returns
   * @memberof I18nService
   */
  static getInstance() {
    if (I18nService._instance === undefined) {
      I18nService._instance = new I18nService();
    }

    return I18nService._instance;
  }

  // see `I18nService.loaded` for more information about this property
  private _loaded = false;

  // see `I18nService.ready` for more information about this property
  private _ready: ExtendedPromise<undefined>;

  // a key-value map of the i18n keys and their internationalizations fetched from the server or provided by the user
  private _dictionary: { [key: string]: string } = {};

  // url to the servlet returning the dictionary
  private _url?: string;

  /**
   * returns true if the I18nService has been set up already. i.e. has a ajax url or the dictionary provided
   *
   * @readonly
   * @type {boolean}
   * @memberof I18nService
   */
  public get isSetUp(): boolean {
    return Boolean(this._url || isFilledObject(this._dictionary));
  }

  /**
   * `loaded` will be true when the keys have been fetched from the server. and `false` otherwise.
   * reading the `loaded` accessor won't trigger the key fetch. For that use {@see I18nService.ready}
   *
   * @readonly
   * @type {boolean}
   * @memberof I18nService
   */
  public get loaded(): boolean {
    return this._loaded;
  }

  /**
   * a promise will be returned that resolves when the keys have been fetched from the server, or the server rejected the ajax call.
   * reading the `ready` accessor will automatically trigger the dictionary fetch.
   * use this property when you NEED the keys to be already loaded and can't be replaced in the DOM later.
   *
   * @readonly
   * @type {Promise<undefined>}
   * @memberof I18nService
   */
  public get ready(): Promise<undefined> {
    if (!this._ready[pendingSymbol]) this.fetchI18nDictionary();

    return this._ready as Promise<undefined>;
  }

  /**
   * providing information necessary for the service to retrieve the i18n dictionary.
   * i.e. a ajax url to fetch data, or a static object with the i18n key-value in it
   *
   * @param {{ url: string; dictionary: Record<string, string> }} { url, dictionary }
   * @returns
   * @memberof I18nService
   */
  public setUp({ url, dictionary }: { url?: string; dictionary?: Record<string, string> } = {}) {
    if (this.isSetUp) {
      console.warn("@kluntje I18nService: service has already been set up. You can't set it up twice!");
      return;
    }
    if (url) {
      this._url = url;
    } else if (dictionary) {
      this._dictionary = dictionary;
      this._loaded = true;
      this._ready[resolveSymbol]();
      this._ready[pendingSymbol] = true;
    } else {
      throw new Error('@kluntje I18nService: a "url" or "dictionary" should have been passed to the setUp function.');
    }
  }

  /**
   * returns the internationalized value for the given i18n key when the value have been fetched from the server,
   * or a placeholder `<span>` with a fallback text based on the key or the provided fallback text
   * which will automatically be replaced with the value in the DOM after server response
   *
   * @param {string} key
   * @param {({ fallback?: string; interpolations?: Array<string | number> | Record<string, string | number> })} [{
   *       fallback,
   *       interpolations,
   *     }={}]
   * @returns {string}
   * @memberof I18nService
   */
  public get(
    key: string,
    {
      fallback,
      interpolations,
    }: { fallback?: string; interpolations?: Array<string | number> | Record<string, string | number> } = {},
  ): string {
    if (this.loaded) {
      if (this._dictionary.hasOwnProperty(key)) {
        let result = this._dictionary[key];
        if (interpolations) {
          Object.entries(interpolations).forEach(([k, v]) => {
            // replaceAll({key}, value)
            result = result.split(`{${k}}`).join(String(v));
          });
        }

        return result;
      }
      console.warn(`@kluntje I18nService: i18n for key '${key}' is missing in dictionary!`);

      return fallback !== undefined ? fallback : this.getHumanReadableName(key);
    }

    if (!this._ready[pendingSymbol]) {
      // add styling for the placeholder first time a placeholder will be added to the DOM
      this.addStyling();
      this.fetchI18nDictionary();
    }

    return this.getPlaceholder(key, { fallback, interpolations });
  }

  /**
   * Creates an instance of I18nService.
   * @memberof I18nService
   */
  private constructor() {
    this._ready = this.getReadyPromise();
  }

  /**
   * returns a Promise like object with properties to allow resolving the promise from the outside
   *
   * @private
   * @returns {ExtendedPromise<undefined>}
   * @memberof I18nService
   */
  private getReadyPromise(): ExtendedPromise<undefined> {
    let resolve: Function;
    let reject: Function;

    // @ts-ignore - other properties will be added in next couple of lines
    const _ready: ExtendedPromise<undefined> = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    // @ts-ignore - `resolve` is defined in the promise body from lines above
    _ready[resolveSymbol] = resolve;
    // @ts-ignore - `reject` is defined in the promise body from lines above
    _ready[rejectSymbol] = reject;
    // will be set to true when ajax call is sent
    _ready[pendingSymbol] = false;

    return _ready;
  }

  /**
   * throws an Error when the service is not set up
   *
   * @private
   * @memberof I18nService
   */
  private ensureSetup(): void {
    if (!this.isSetUp) throw new Error('@kluntje I18nService: should be set up before calling other APIs');
  }

  /**
   * add minimal styling for the placeholder to look as much as possible as if they were a text node and not a html element,
   * and without the need of an actual .css file to be loaded
   *
   * @private
   * @memberof I18nService
   */
  private addStyling(): void {
    const head = document.head;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(
      document.createTextNode(`
      .${I18nService.PLACEHOLDER_SELECTOR} {
        display: contents;
      }
    `),
    );
    head.appendChild(style);
  }

  /**
   * retrieves the i18n key.value pairs, and update instance properties regarding the pending/fulfilled status of the request
   *
   * @private
   * @memberof I18nService
   */
  private fetchI18nDictionary() {
    this.ensureSetup();
    this._ready[pendingSymbol] = true;

    fetchJSON(this._url!)
      .then((results: Record<string, string>) => {
        this._dictionary = results;
        this._loaded = true;
        this._ready[resolveSymbol]();
        this.fillInPlaceholders();
      })
      .catch((err: Error) => {
        console.error('@kluntje I18nService: unable to fetch keys from server!', err);
        // ? adding a failed flag
        this._loaded = true;
        this._ready[resolveSymbol]();
      });
  }

  /**
   * i18n placeholder in the DOM will be fetched with i18n values been fetched from the server.
   *
   * @private
   * @memberof I18nService
   */
  private fillInPlaceholders() {
    Array.from(document.getElementsByClassName(I18nService.PLACEHOLDER_SELECTOR)).forEach((el) => {
      const { key, fallback, interpolations } = (el as HTMLElement).dataset;

      el.replaceWith(
        this.get(key!, {
          fallback,
          interpolations: interpolations ? JSON.parse(interpolations) : undefined,
        }),
      );
    });
  }

  /**
   * converts the i18n key names to values that can be used as fallback for the i18n text
   * @example
   * getHumanReadableName("org.example.hyphenated_name.filter.submitBtn") === "submit btn"
   *
   * @private
   * @param {string} key
   * @returns
   * @memberof I18nService
   */
  private getHumanReadableName(key: string) {
    return (
      key
        // "org.example.hyphenated_name.filter.submitBtn" -> "submitBtn"
        .split('.')
        .reverse()[0]
        // "submitBtn" -> "submit btn"
        .replace(/[A-Z]/g, (letter: string) => ` ${letter.toLowerCase()}`)
    );
  }

  /**
   * generates a span element whith the fallback text to be replaced with the correct i18n value after server response
   *
   * @private
   * @param {string} key
   * @param {string} [fallback]
   * @returns
   * @memberof I18nService
   */
  private getPlaceholder(
    key: string,
    {
      fallback,
      interpolations,
    }: { fallback?: string; interpolations?: Array<string | number> | Record<string, string | number> } = {},
  ) {
    const span = document.createElement('span');
    span.innerText = fallback !== undefined ? fallback : this.getHumanReadableName(key);
    span.classList.add(I18nService.PLACEHOLDER_SELECTOR);
    span.setAttribute('data-key', key);
    if (fallback) span.setAttribute('data-fallback', fallback);
    // use escaping mechanism of setAttribute to store the stringified json
    if (interpolations) span.setAttribute('data-interpolations', JSON.stringify(interpolations));

    return span.outerHTML;
  }
}
