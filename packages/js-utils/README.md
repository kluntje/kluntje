<h1 align="center">Welcome to @kluntje/js-utils 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: (Apache)" src="https://img.shields.io/badge/License-(Apache)-yellow.svg" />
  </a>
</p>

> Js utils is a collection of javscript helpers for speeding up your daily javascript tasks.

## Install

```sh
npm install @kluntje/js-utils
```

## Usage

Just import the helper where you need and use it.

## Helpers

## Categories

Currently **37 helpers** in **5 categories**:
- [Api helpers](#api-helpers)
- [Array helpers](#array-helpers)
- [Dom helpers](#dom-helpers)
- [Object helpers](#object-helpers)
- [String helpers](#string-helpers)

## Api helpers

### fetchJSON

Calls API and returns JSON as Promise

**Params**

* `string` **{String}**: url
* `RequestInit` **{Object}**: fetch options
* `returns` **{Promise}**

**Example**

```javascript
import {fetchJSON} from "@kluntj/js-utils/api-helpers/fetchJSON";

fetchJSON("https://jsonplaceholder.typicode.com/todos/1")
```

## Run tests

```sh
npm run test
```

## Author

👤 **Frederik Riewerts <frederik.riewerts@gmail.com>**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
