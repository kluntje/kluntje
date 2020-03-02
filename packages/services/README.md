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
