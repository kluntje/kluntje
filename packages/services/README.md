# `@kluntje/services`

Collection of useful services, when creating web-components.

## Install

```sh
npm install @kuntje/services
```

## Usage

### ViewportObserver

IntersectionObserver instance, that fires "kl-in-vp"-event when Component enters Viewport and "kl-out-vp"-event when it leaves the Viewport

```javascript
import { ViewportObserver } from "@kluntje/services";

class MyAmazingComponent extends Component {
  viewportObserver = ViewportObserver.getInstance();

  afterComponentRender(): void {
    this.viewportObserver.observe(this);
  }
}
// ...

```

---

### MediaQueryService

Service, that fires "kl-mq-change"-events on window, when mq-change occurs.

```javascript
import { MediaQueryService } from "@kluntje/services";

const myMQs = [
  {
    name: 'MQ2',
    query: '(min-width: 769px)'
  },
  {
    name: 'MQ1',
    query: '(min-width: 0px)'
  }
];

MediaQueryService.getInstance(myMQs);

// ...

```

---

### URLSearchParamsService

Service, that gets and sets URLSearchParams.

```javascript
import { URLSearchParamsService } from "@kluntje/services";

// get single query param
const queryParam = URLSearchParamsService.get("query");

// set single query param
URLSearchParamsService.set("query", "newValue");

// delete single query param
URLSearchParamsService.delete("filter");

// get all query params of specific key
const filters: string[] | null = URLSearchParamsService.getAll("filter");

// ...

```

---

### DebuggerService

Service to log messages to the console depending on js-debug query-param.

```javascript
import { DebuggerService } from "@kluntje/services";

// log message to console
DebuggerService.log("Hello World");

// log warning to console
DebuggerService.warn("Warning");

// log error to console
DebuggerService.error("Error");

```

When using in Jest unit tests, make sure using `jest.mock` to properly mock the imported module.

```javascript
import { DebuggerService } from "@kluntje/services";
jest.mock("@kluntje/services");

// e.g.
spyOn(DebuggerService, "error");
```

---

### LazyConnectService

Service to trigger callback, when component is in viewport.

```javascript
import { LazyConnectService } from "@kluntje/services";

LazyConnectService.subscribe(this, () => this.doSomething());

```

---

### I18nService

A service to provide sync/async way to provide internationalization values.
With i18n values being able to have variable placeholder in them. indexed for arrays e.g. `{0}` or named for objects e.g. `{hour}`.

Usage:

import module and get the singleton instance:

```javascript
import { I18nService } from '@kluntje/services';

// get singleton instance
const i18nService = I18nService.getInstance();
```

set up via url for the ajax endpoint returning the dictionary

```javascript
// provide the url to fetch the dictionary
i18nService.setUp({ url: 'path/to/i18n/ajax/service' });

```

or provide the dictionary

```javascript
// provide the dictionary
i18nService.setUp({
  dictionary: {
    'com.page.filter.notifications': '{0} Nachrichten',
    // ...
  }
});
```

using the `get` method to render i18n values:

```javascript
const i18n = i18nService.get;

render(
  html`<button>${
    i18n('com.page.filter.notifications', {
      fallback: "Info",
      interpolations: [7]
    })}
    </button>`, el);
```

If the dictionary hasn't been fetched yet a placeholder element will be returned `<span class="kl-i18n-placeholder">{fallback}</span>` with the provided `fallback` text, or the last part of the key. This placeholder will be replaced in den DOM with the i18n value as soon as the dictionary is fetched.

Signature of the get method: `I18nService.getInstance().get(i18nKey, options)`

`[options.fallback]` `{string}`: text to be rendered when the dictionary hasn't been loaded. if not provided, the last part of the key (after the last `.` will be used.)

`[options.interpolations]` `{Array|Object}`: a list of items to be put in the placeholders in the i18n value.

```javascript
I18nService.getInstance().setUp({dictionary: {'duration': '{hour} Stunden und {minutes} Minuten.'}})
console.log(I18nService.getInstance().get('duration', { interpolations: { hour: '10', minutes: '15' } }))
// will print '10 Stunden und 15 Minuten.'

```

If any action needs the keys to be ready and shouldn't be replaced later in the DOM, the `ready` accessor can be called. This will automatically trigger the fetch for the keys from the server (if not done already)

```javascript
await i18nService.ready;
localStorage.setItem('welcomeText', i18nService.get('com.page.filter.salutation', {interpolations: userInfo}));
```

The boolean `loaded` can be used to check if the keys have been fetched form the server. This will not trigger the fetch.

```javascript
return i18nService.loaded ? textMarkup : iconMarkup;
```

### StorageService

Service to store and retrieve data from localStorage or sessionStorage.

```javascript
import { StorageService } from "@kluntje/services";

StorageService.addItem("my-storage-key", "my-storage-value");
StorageService.observeItem("my-storage-key", () => console.log("my-storage-key has changed"));
StorageService.removeItem("my-storage-key");
```

#### Options
- `storageType (optional)`: `"local" | "session"` (default: "local") - defines the storage to use

#### Advanced Usage

It is certainly possible to extend the `StorageServiceImpl` class and override the methods to customize the behavior or implement a fully custom caching service that implements the `IStorageService` interface.

--- 

### CachingService

Service to cache data using the StorageService or in-memory.

```javascript
import { CachingService } from "@kluntje/services";

CachingService.cacheValue("my-cache-key", "my-cache-value", {
  validFor: 1000 * 60 * 60, // 1 hour
  storageType: "local",
});

const cachedValue = CachingService.getCachedValue("my-cache-key", {
  storageType: "local",
});

CachingService.clearCachedValue("my-cache-key", {
  storageType: "local",
});
```

#### Options
- `validFor`: `number` - defines the time in milliseconds the value is valid
storageType
- `storageType (optional)`: `"local" | "session"` (default: "local") - defines the storage to use


#### Advanced Usage

It is possible to customize the caching service by initializing the service with a custom StorageService implementation and/or a custom storageKeyPrefix.

```javascript
import { CachingServiceImpl } from "@kluntje/services";
import { CustomStorageService } from "./CustomStorageService";

export default new CachingServiceImpl({
  storageService: CustomStorageService,
  storageKeyPrefix: "my-custom-prefix",
});
```

Further, it is certainly possible to extend the `CachingServiceImpl` class and override the methods to customize the behavior or implement a fully custom caching service that implements the `ICachingService` interface.

---

### RequestCachingService

Service to cache requests using the [caches-api](https://developer.mozilla.org/en-US/docs/Web/API/Cache).

```javascript
import { RequestCachingService } from "@kluntje/services";

const response = await fetch(url);

await RequestCachingService.cacheRequest({
  request: new Request(url),
  response,
  storage: "local",
  maxAge: 1000 * 60 * 60, // 1 hour
});

const cachedResponse = await RequestCachingService.getCachedResponse(new Request(url), {
  storage: "local",
});
```

#### Options
- `request`: `Request` - the request to cache
- `response`: `Response` - the response to cache
- `storage`: `"local" | "session"` - defines the storage to use
- `maxAge`: `number` - defines the time in milliseconds the value is valid

#### Advanced Usage

It is possible to customize the request caching service by initializing the service with:
- a custom StorageService implementation (optional)
- a custom storageKeyPrefix (optional)
- a custom requestCacheName (optional)

```javascript
import { RequestCachingServiceImpl } from "@kluntje/services";
import { CustomStorageService } from "./CustomStorageService";

export default new RequestCachingServiceImpl({
  storageService: CustomStorageService,
  storageKeyPrefix: "my-custom-prefix",
  requestCacheName: "my-custom-request-cache",
});
```

Further, it is certainly possible to extend the `RequestCachingServiceImpl` class and override the methods to customize the behavior or implement a fully custom caching service that implements the `IRequestCachingService` interface.

---


### APIService

Service to handle API requests.

```javascript
import { APIService } from "@kluntje/services";

const responseJSON = await APIService.fetchJSON("https://api.example.com/data");
const responseHTML = await APIService.fetchHTML("https://example.com");
```

#### Options

- `fetchOptions`: `RequestInit` - options for the fetch request
- `cacheOptions`: 
  - all options from `CachingService`
  - `forceRefetch`: `boolean` (default: `false`) - defines if the request should be refetched even if it is cached
  - `requestBasedCaching`: `boolean` (default: `false`) - defines if the caching should be request-based or not
  - `cacheKeys`: `string[]` - list of keys to add to the cache key (default: `[]`) - useful for post-requests since the cache key is generated from the request url
- `throwError`: `boolean` (default: `false`) - defines if the service should throw an Errors


#### Advanced Usage

It is possible to customize the api service by initializing the service with:
- a custom CachingService implementation (optional)
- a custom RequestCachingService implementation (optional)

```javascript
import { APIServiceImpl } from "@kluntje/services";
import { CustomCachingService } from "./CustomCachingService";
import { CustomRequestCachingService } from "./CustomRequestCachingService";

export default new APIServiceImpl({
  cachingService: CustomCachingService,
  requestCachingService: CustomRequestCachingService,
});
```

Further, it is certainly possible to extend the `APIServiceImpl` class and override the methods to customize the behavior or implement a fully custom caching service that implements the `IAPIService` interface.

---

### AbortableRequestService

Wrapper for APIService to handle abortable requests.

```javascript
import { AbortableRequestService } from "@kluntje/services";

const abortableRequestService = new AbortableRequestService();

const abortableRequest1 = abortableRequestService.fetchJSON("https://api.example.com/data?value=1");
const abortableRequest2 = abortableRequestService.fetchJSON("https://api.example.com/data?value=2");

// the service aborts request 1 and resolves both promises with the result of request 2
```

#### Options
- `url`: `string` - the url to fetch
- `options`: APIService options

---


### ObserverService

Message bus to observe and notify events.

```javascript
import { ObserverService } from "@kluntje/services";

observerService.observe("my-event", (data) => console.log(data));  
observerService.notify("my-event", "Hello World");
```

#### Advanced Usage

It is certainly possible to extend the `ObserverServiceImpl` class and override the methods to customize the behavior or implement a fully custom caching service that implements the `IObserverService` interface.

---

### ContextStateService

Service to create and consume context states. A ContextState is a state that belongs to a DOM-Element. All children of this element can access the state.


#### Create a ContextState

```javascript
import { ContextStateService } from "@kluntje/services";

const contextState = ContextStateService.createContextState("my-context-state", this); // this is the ContextState holding DOM-Element
```

#### Set a value

```javascript
const contextState = await ContextStateService.getContextState("my-context-state", this); // this is a child of ContextState holding DOM-Element

contextState.setState("myStateItem", "myStateValue");
```

#### Get a value

```typescript

const contextState = await ContextStateService.getContextState("my-context-state", this); // this is a child of ContextState holding DOM-Element

const stateValue = contextState.getState("myStateItem");
```

#### Observer a state change

```javascript
const contextState = await ContextStateService.getContextState("my-context-state", this); // this is a child of ContextState holding DOM-Element

contextState.observeState("myStateItem", () => console.log("myStateItem has changed"));
```

#### Advanced Usage

For better type safety, it is possible to define a type for the state.

```typescript
import { ContextStateService } from "@kluntje/services";

interface MyStateDefinition {
  myStateItem: string;
  myOtherStateItem: number;
}

const contextState = ContextStateService.createContextState<MyStateDefinition>("my-context-state", this); 

contextState.setState("myStateItem", "myStateValue");
contextState.setState("myOtherStateItem", "myStateValue"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
contextState.setState("myOtherStateItem", 42);

const stringValue = contextState.getState("myStateItem"); // stateValue is of type string
const numberValue = contextState.getState("myOtherStateItem"); // stateValue is of type number
```

---
