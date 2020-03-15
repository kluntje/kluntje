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

### MediaQueryService

Service, that fires "kl-mq-change"-events on window, when mq-change occures.

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

### I18nService

A service to provide sync/async way to provide internationalization values.
With i18n values beeing able to have variable placeholder in them. indexed for arrays e.g. `{0}` or named for objects e.g. `{hour}`.

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
