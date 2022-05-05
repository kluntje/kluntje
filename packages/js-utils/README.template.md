<h1 align="center">Welcome to @kluntje/js-utils 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: Apache 2.0" src="https://img.shields.io/badge/License-Apache_2.0-yellow.svg" />
  </a>
</p>

> Kluntje/js-utils is a collection of really usefull js functions that can be imported in any project and speed up your daily javascript tasks.

## Install

```sh
npm install @kuntje/js-utils
```

## Usage

```js
import { inViewport } from '@kluntje/js-utils/lib/dom-helpers';
const inView = inViewport(document.querySelector("#teaser"));

// You can also import from top level. But this is not suitable for three shaking!
import { domHelpers } from "@kluntje/js-utils";
const inView = domHelpers.inViewport(document.querySelector("#teaser"));
```
{%body%}

## Author

👤 **Frederik Riewerts <frederik.riewerts@gmail.com>**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_