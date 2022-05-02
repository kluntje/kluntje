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

## Functions

<dl>
<dt><a href="#fetchJSON">fetchJSON(url, [options])</a> ⇒ <code>Promise.&lt;T&gt;</code></dt>
<dd><p>Calls API and returns JSON as Promise</p></dd>
<dt><a href="#hasElement">hasElement(array, element)</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, if element is in given array</p></dd>
<dt><a href="#isFilledArray">isFilledArray(array)</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, whether given Array exists and has at least one element</p></dd>
<dt><a href="#mergeArraysBy">mergeArraysBy(array1, array2, checker)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>merge two given arrays by the given checker function</p></dd>
<dt><a href="#pushIfNew">pushIfNew(array, newElement)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>pushes new Element to given array, if its not already in it</p></dd>
<dt><a href="#removeItem">removeItem(array, itemToRemove)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>removes specific Item from array and return new array</p></dd>
<dt><a href="#addDays">addDays(date, daysToAdd, [zeroHours])</a> ⇒ <code>Date</code></dt>
<dd><p>Adds given amount of days to given date</p></dd>
<dt><a href="#addLeadingZero">addLeadingZero(inNumber)</a> ⇒ <code>string</code></dt>
<dd><p>Optionally Adds leading Zero to Numbers &lt; 10</p></dd>
<dt><a href="#isEqualDate">isEqualDate(dateA, dateB)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks whether given dates are equal</p></dd>
<dt><a href="#sanitizeDateGMTOffset">sanitizeDateGMTOffset(date)</a> ⇒ <code>string</code></dt>
<dd><p>Helper to make date parsing cross browser compatible
Some browsers (e.g. Safari) need the GMT offset part to be in format &quot;+00:00&quot;
This helper makes sure that any present GMT offset follows that format and can safely be parsed:
Date.parse(&quot;2020-01-01T12:13:14.000+0200&quot;) // throws error in Safari
Date.parse(&quot;2020-01-01T12:13:14.000+02:00&quot;) // succes</p></dd>
<dt><a href="#addClass">addClass(elements, ...classNames)</a></dt>
<dd><p>adds given classes to one or multiple elements</p></dd>
<dt><a href="#find">find(parent, selector)</a> ⇒ <code>Element</code> | <code>null</code></dt>
<dd><p>returns the first child of a specific parent matching the given selector</p></dd>
<dt><a href="#findAll">findAll(parent, selector)</a> ⇒ <code>Array.&lt;Element&gt;</code></dt>
<dd><p>returns all children of a specific parent matching the given selector</p></dd>
<dt><a href="#callback">callback(node, index)</a> ⇒</dt>
<dd></dd>
<dt><a href="#getCurrentMQ">getCurrentMQ(mediaQueries)</a> ⇒ <code>string</code></dt>
<dd><p>returns current mediaQuery-name. e.g. &quot;MQ2&quot;</p></dd>
<dt><a href="#getInnerText">getInnerText(el)</a> ⇒ <code>string</code></dt>
<dd><p>returns innerText of given Element</p></dd>
<dt><a href="#getParent">getParent(element, parentSelector)</a> ⇒ <code>Element</code> | <code>null</code></dt>
<dd><p>returns parent of specific class, if found</p></dd>
<dt><a href="#getUniqueID">getUniqueID()</a> ⇒ <code>string</code></dt>
<dd><p>returns a random String to be used as ID</p></dd>
<dt><a href="#hasChild">hasChild(parent, childSelector)</a> ⇒ <code>boolean</code></dt>
<dd><p>returns if a specific parent has a child matching the given selector</p></dd>
<dt><a href="#hasClass">hasClass(element, className)</a> ⇒ <code>boolean</code></dt>
<dd><p>returns if a specific element has given class</p></dd>
<dt><a href="#inViewport">inViewport(element, [parent])</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, whether an element is in the viewport</p></dd>
<dt><a href="#isNodeList">isNodeList(target)</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, if target is NodeList</p></dd>
<dt><a href="#onEvent">onEvent(target, events, handler, context, [options])</a></dt>
<dd><p>adds event with given parameters</p></dd>
<dt><a href="#removeChildren">removeChildren(parent, selector)</a></dt>
<dd><p>removes all children of a specific parent matching the given selector</p></dd>
<dt><a href="#removeClass">removeClass(elements, ...classNames)</a></dt>
<dd><p>removes given class from element</p></dd>
<dt><a href="#removeEvent">removeEvent(target, events, handler, context, [options])</a></dt>
<dd><p>removes event with given parameters</p></dd>
<dt><a href="#toggleClass">toggleClass(elements, className, add)</a></dt>
<dd><p>toggles given class on given element</p></dd>
<dt><a href="#waitFor">waitFor(timeout)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>resolves Promise after given timeout</p></dd>
<dt><a href="#waitForEvent">waitForEvent(target, eventName, timeout)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>waits for given event for a (optional) max-timeout</p></dd>
<dt><a href="#debounce">debounce(callback, [wait])</a> ⇒ <code>function</code></dt>
<dd><p>returns a debounced function which when called multiple of times each time it waits the waiting duration
and if the method was not called during this time, the last call will be passed to the callback.</p></dd>
<dt><a href="#decoratorGenerator">decoratorGenerator(func)</a> ⇒ <code>function</code></dt>
<dd><p>generates a decorator factory for the provided helper function.
helper function should have this signature: <code>(Function, ...args: any[]) =&gt; Function</code></p></dd>
<dt><a href="#throttle">throttle(callback, [wait])</a> ⇒ <code>function</code></dt>
<dd><p>returns a throttled function which when called, waits the given period of time before passing the last call during this time to the provided callback.
call <code>.cancel()</code> on the returned function, to cancel the callback invocation.</p></dd>
<dt><del><a href="#getValue">getValue(obj, path)</a> ⇒ <code>*</code></del></dt>
<dd><p>returns nested value without throwing an error if the parent doesn't exist</p></dd>
<dt><a href="#isEqual">isEqual(arg1, arg2)</a> ⇒ <code>boolean</code></dt>
<dd><p>compare two arguments, for object their toString values are compared</p></dd>
<dt><a href="#isFilledObject">isFilledObject(obj)</a> ⇒ <code>boolean</code></dt>
<dd><p>checks if provided argument is an object which has at least one entry in it.</p></dd>
<dt><a href="#naiveClone">naiveClone(arg)</a> ⇒ <code>Nullable.&lt;T&gt;</code> | <code>Array.&lt;T&gt;</code></dt>
<dd><p>returns a deep link of the provided argument</p></dd>
<dt><a href="#toArray">toArray(arg)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>returns the argument wrapped in an array if it isn't array itself</p></dd>
<dt><a href="#toString">toString(arg)</a> ⇒ <code>string</code></dt>
<dd><p>returns stringified value for the given argument</p></dd>
<dt><a href="#getCleanString">getCleanString(inputString)</a> ⇒ <code>string</code></dt>
<dd><p>removes all multi Whitespaces and Newlines in given string</p></dd>
<dt><a href="#getWordCount">getWordCount(text)</a> ⇒ <code>number</code></dt>
<dd><p>returns number of words in a given text</p></dd>
<dt><a href="#removeAllBS">removeAllBS(inputString)</a> ⇒ <code>string</code></dt>
<dd><p>removes all Whitespaces in given string</p></dd>
<dt><a href="#removeAllNL">removeAllNL(inputString)</a> ⇒ <code>string</code></dt>
<dd><p>removes all Newlines in given string</p></dd>
<dt><a href="#removeMultiBS">removeMultiBS(inputString)</a> ⇒ <code>string</code></dt>
<dd><p>removes multi Whitespaces in given string</p></dd>
<dt><a href="#toCamelCase">toCamelCase(str)</a> ⇒ <code>string</code></dt>
<dd><p>function to convert texts to camelCase for example ti generate attribute names</p></dd>
<dt><a href="#toKebabCase">toKebabCase(str)</a> ⇒ <code>string</code></dt>
<dd><p>converts the provided string to a kebab case (kebab-case)</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#callback">callback</a> : <code>function</code></dt>
<dd><p>iterates over all nodes in a node list
(necessary because IE11 doesn't support .forEach  * for NodeLists)</p></dd>
</dl>

<a name="fetchJSON"></a>

## fetchJSON(url, [options]) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Calls API and returns JSON as Promise</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>RequestInit</code> | 

**Example**  
```js
// use with async/await
const myApiResponse = await fetchJSON("https://some.api/path")
```
**Example**  
```js
// use as normal promise
fetchJSON("https://some.api/path").then((data) => console.log("myData:", data));
```
<a name="hasElement"></a>

## hasElement(array, element) ⇒ <code>boolean</code>
<p>checks, if element is in given array</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;T&gt;</code> | 
| element | <code>T</code> | 

**Example**  
```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];

if (hasElement(fruits, "Apple")) {
  console.log("You got an Apple");
}
```
<a name="isFilledArray"></a>

## isFilledArray(array) ⇒ <code>boolean</code>
<p>checks, whether given Array exists and has at least one element</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;T&gt;</code> | 

**Example**  
```js
const myBooks = await fetchJSON("https://my-book-store.api/books");
if (isFilledArray(myBooks)) {
  console.log(`${myBooks.length} Books found!`)
} else {
  console.log("Sorry, no Books found");
}
```
<a name="mergeArraysBy"></a>

## mergeArraysBy(array1, array2, checker) ⇒ <code>Array.&lt;T&gt;</code>
<p>merge two given arrays by the given checker function</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array1 | <code>Array.&lt;T&gt;</code> |  |
| array2 | <code>Array.&lt;T&gt;</code> |  |
| checker | <code>function</code> | <p>if this function returns true for a specific element combination the elements are getting merged</p> |

**Example**  
```js
const defaultUsers = [
  {
    name: "Admin",
    mail: "admin@company.com"
  },
  {
    name: "CI",
    mail: "ci@company.com"
  }
];

const projectUsers = [
  {
    name: "Admin",
    mail: "admin@company.com"
  },
  {
    name: "User1",
    mail: "user-one@company.com"
  },
  {
    name: "User2",
    mail: "user-two@company.com"
  }
];

const userList = mergeArraysBy(defaultUsers, projectUsers, (defaultUser, array) => {
  return !array.some((projectUser) => projectUser.mail === defaultUser.mail)
})

// userList
// [
//   {
//     "name": "CI",
//     "mail": "ci@company.com"
//   },
//   {
//     "name": "Admin",
//     "mail": "admin@company.com"
//   },
//   {
//     "name": "User1",
//     "mail": "user-one@company.com"
//   },
//   {
//     "name": "User2",
//     "mail": "user-two@company.com"
//   }
// ] 
```
<a name="pushIfNew"></a>

## pushIfNew(array, newElement) ⇒ <code>Array.&lt;T&gt;</code>
<p>pushes new Element to given array, if its not already in it</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;T&gt;</code> | 
| newElement | <code>T</code> | 

**Example**  
```js
const fruitStore = ["Banana", "Orange", "Apple", "Mango"];
const newFruit = getInputValue(...)
const newFruitStore = pushIfNew(fruitStore, newFruit);
```
<a name="removeItem"></a>

## removeItem(array, itemToRemove) ⇒ <code>Array.&lt;T&gt;</code>
<p>removes specific Item from array and return new array</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;T&gt;</code> | 
| itemToRemove | <code>T</code> | 

**Example**  
```js
const fruitStore = ["Banana", "Orange", "Apple", "Mango"];
const newFruitStore = removeItem(fruitStore, "Apple"); // ["Banana", "Orange", "Mango"]
```
<a name="addDays"></a>

## addDays(date, daysToAdd, [zeroHours]) ⇒ <code>Date</code>
<p>Adds given amount of days to given date</p>

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>Date</code> |  |  |
| daysToAdd | <code>number</code> |  |  |
| [zeroHours] | <code>boolean</code> | <code>false</code> | <p>set time to 0:00:00</p> |

**Example**  
```js
const today = new Date();
const tomorrow = addDays(today, 2);
```
<a name="addLeadingZero"></a>

## addLeadingZero(inNumber) ⇒ <code>string</code>
<p>Optionally Adds leading Zero to Numbers &lt; 10</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| inNumber | <code>number</code> | 

**Example**  
```js
const today = new Date();
const formattedDateSting = `${addLeadingZero(today.getDate())}.${addLeadingZero(today.getMonth() + 1)}.${today.getFullYear()}`;
```
<a name="isEqualDate"></a>

## isEqualDate(dateA, dateB) ⇒ <code>boolean</code>
<p>Checks whether given dates are equal</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| dateA | <code>Date</code> | 
| dateB | <code>Date</code> | 

**Example**  
```js
const dateA = new Date(2020, 1, 29, 22, 30);
const dateB = new Date(2020, 1, 29, 18, 20);
isEqualDate(dateA. dateB); // true
```
<a name="sanitizeDateGMTOffset"></a>

## sanitizeDateGMTOffset(date) ⇒ <code>string</code>
<p>Helper to make date parsing cross browser compatible
Some browsers (e.g. Safari) need the GMT offset part to be in format &quot;+00:00&quot;
This helper makes sure that any present GMT offset follows that format and can safely be parsed:
Date.parse(&quot;2020-01-01T12:13:14.000+0200&quot;) // throws error in Safari
Date.parse(&quot;2020-01-01T12:13:14.000+02:00&quot;) // succes</p>

**Kind**: global function  
**Returns**: <code>string</code> - <p>correctly formatted date</p>  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | <p>date string to be sanitized for parsing</p> |

**Example**  
```js
sanitizeDateGMTOffset("2020-01-01T12:13:14.000+0200") // "2020-01-01T12:13:14.000+02:00"
```
<a name="addClass"></a>

## addClass(elements, ...classNames)
<p>adds given classes to one or multiple elements</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| elements | <code>Element</code> \| <code>Iterable.&lt;Element&gt;</code> \| <code>NodeListOf.&lt;Element&gt;</code> \| <code>null</code> | 
| ...classNames | <code>string</code> | 

**Example**  
```js
const button = document.querySelector('.button');
addClass(button, 'my-button');
```
**Example**  
```js
const inputs = document.querySelectorAll('input');
addClass(inputs, 'my-button');
```
<a name="find"></a>

## find(parent, selector) ⇒ <code>Element</code> \| <code>null</code>
<p>returns the first child of a specific parent matching the given selector</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> \| <code>Document</code> \| <code>null</code> | 
| selector | <code>string</code> | 

**Example**  
```js
const input = find(document, 'input');
```
<a name="findAll"></a>

## findAll(parent, selector) ⇒ <code>Array.&lt;Element&gt;</code>
<p>returns all children of a specific parent matching the given selector</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> \| <code>Document</code> \| <code>null</code> | 
| selector | <code>string</code> | 

**Example**  
```js
const inputs = findAll(document, 'input');
```
<a name="callback"></a>

## callback(node, index) ⇒
**Kind**: global function  
**Returns**: <p>any</p>  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| index | <code>Number</code> | 

<a name="getCurrentMQ"></a>

## getCurrentMQ(mediaQueries) ⇒ <code>string</code>
<p>returns current mediaQuery-name. e.g. &quot;MQ2&quot;</p>

**Kind**: global function  
**Returns**: <code>string</code> - <ul>
<li>mediaQuery name e.g. MQ1</li>
</ul>  

| Param | Type |
| --- | --- |
| mediaQueries | <code>Array.&lt;MQDefinition&gt;</code> | 

**Example**  
```js
const myMqs = [
  {
    name: 'MQ2',
    query: '(min-width: 769px)'
  },
  {
    name: 'MQ1',
    query: '(min-width: 0px)'
  }
];

const curMQ = getCurrentMQ(myMqs);
```
<a name="getInnerText"></a>

## getInnerText(el) ⇒ <code>string</code>
<p>returns innerText of given Element</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

**Example**  
```js
const myArticle = document.querySelector('article');
const articleText = getInnerText(myArticle);
```
<a name="getParent"></a>

## getParent(element, parentSelector) ⇒ <code>Element</code> \| <code>null</code>
<p>returns parent of specific class, if found</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| parentSelector | <code>string</code> | 

**Example**  
```js
const myText = document.querySelector('p');
const myArticle = getParent(myText, 'article');
```
<a name="getUniqueID"></a>

## getUniqueID() ⇒ <code>string</code>
<p>returns a random String to be used as ID</p>

**Kind**: global function  
<a name="hasChild"></a>

## hasChild(parent, childSelector) ⇒ <code>boolean</code>
<p>returns if a specific parent has a child matching the given selector</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> | 
| childSelector | <code>string</code> | 

**Example**  
```js
const article = document.querySelector('article');
if (hasChild(article, '.cta')) console.log('please click');
```
<a name="hasClass"></a>

## hasClass(element, className) ⇒ <code>boolean</code>
<p>returns if a specific element has given class</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| className | <code>string</code> | 

**Example**  
```js
const cta = document.querySelector('button');
if (hasClass(cta, 'primary')) console.log("primary")
```
<a name="inViewport"></a>

## inViewport(element, [parent]) ⇒ <code>boolean</code>
<p>checks, whether an element is in the viewport</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| [parent] | <code>Element</code> | 

**Example**  
```js
const image = document.querySelector('image');
if (inViewport(image)) image.setAttribute('src', image.dataset('src'));
```
<a name="isNodeList"></a>

## isNodeList(target) ⇒ <code>boolean</code>
<p>checks, if target is NodeList</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| target | <code>any</code> | 

<a name="onEvent"></a>

## onEvent(target, events, handler, context, [options])
<p>adds event with given parameters</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| target | <code>EventTarget</code> \| <code>null</code> | 
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 
| handler | <code>function</code> | 
| context | <code>Context</code> | 
| [options] | <code>AddEventListenerOptions</code> | 

**Example**  
```js
const buttons = findAll(document, 'button);
onEvent(buttons, 'click', () => console.log('button clicked'), this);
```
<a name="removeChildren"></a>

## removeChildren(parent, selector)
<p>removes all children of a specific parent matching the given selector</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> | 
| selector | <code>string</code> | 

**Example**  
```js
const article = find('article);
removeChildren(article, '.ad');
```
<a name="removeClass"></a>

## removeClass(elements, ...classNames)
<p>removes given class from element</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| elements | <code>Element</code> \| <code>Iterable.&lt;Element&gt;</code> \| <code>NodeListOf.&lt;Element&gt;</code> \| <code>null</code> | 
| ...classNames | <code>string</code> | 

**Example**  
```js
const button = document.querySelector('.button');
removeClass(button, 'active');
```
**Example**  
```js
const inputs = document.querySelectorAll('input');
removeClass(inputs, 'active');
```
<a name="removeEvent"></a>

## removeEvent(target, events, handler, context, [options])
<p>removes event with given parameters</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| target | <code>HTMLElement</code> \| <code>Iterable.&lt;HTMLElement&gt;</code> | 
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 
| handler | <code>function</code> | 
| context | <code>Context</code> | 
| [options] | <code>AddEventListenerOptions</code> | 

**Example**  
```js
const buttons = findAll(document, 'button);
removeEvent(buttons, 'click', () => console.log('button clicked'), this);
```
<a name="toggleClass"></a>

## toggleClass(elements, className, add)
<p>toggles given class on given element</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| elements | <code>Element</code> \| <code>Iterable.&lt;Element&gt;</code> \| <code>NodeListOf.&lt;Element&gt;</code> \| <code>null</code> | 
| className | <code>string</code> | 
| add | <code>boolean</code> | 

**Example**  
```js
const button = find(document, 'button');
onEvent(button, 'click', () => toggleClass(button, 'active'), this);
```
<a name="waitFor"></a>

## waitFor(timeout) ⇒ <code>Promise.&lt;void&gt;</code>
<p>resolves Promise after given timeout</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>number</code> | <p>timeout in milliseconds</p> |

**Example**  
```js
addClass(button, 'animate');
waitFor(300).then(() => removeClass(button, 'animate'));
```
**Example**  
```js
addClass(button, 'animate');
await waitFor(300);
removeClass(button, 'animate');
```
<a name="waitForEvent"></a>

## waitForEvent(target, eventName, timeout) ⇒ <code>Promise.&lt;void&gt;</code>
<p>waits for given event for a (optional) max-timeout</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>HTMLElement</code> |  |
| eventName | <code>string</code> |  |
| timeout | <code>number</code> | <p>timeout in milliseconds</p> |

**Example**  
```js
addClass(button, 'animate');
waitForEvent(button, 'transitionend', 500).then(() => removeClass(button, 'animate'));
```
**Example**  
```js
addClass(button, 'animate');
await waitForEvent(button, 'transitionend', 500);
removeClass(button, 'animate');
```
<a name="debounce"></a>

## debounce(callback, [wait]) ⇒ <code>function</code>
<p>returns a debounced function which when called multiple of times each time it waits the waiting duration
and if the method was not called during this time, the last call will be passed to the callback.</p>

**Kind**: global function  
**Debounce(100)**: scrollHandler(event) {
      // ...
     }
  }  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | <p>function to be called after the last wait period</p> |
| [wait] | <code>number</code> | <code>0</code> | <p>waiting period in ms before the callback is invoked if during this time the debounced method was not called</p> |

**Example**  
```js
const debounced = debounce(console.log, 500);
  debonced("Hi");
  debonced("Hello");
  debonced("Hey");
  if (neverMind) debonced.cancel();
  // logs only "Hey", and when `neverMind === false`, doesn't log anything.


  // or instead of decorator on class methods
  Class Component {
    constructor() {
      window.addEventListener("resize", this.resizeHandler);
      window.addEventListener("scroll", this.scrollHandler);
    }

    resizeHandler = debounce(event => {
      // event handlers logic
    }, 100);

    // or when the decorator is imported:
    
```
<a name="decoratorGenerator"></a>

## decoratorGenerator(func) ⇒ <code>function</code>
<p>generates a decorator factory for the provided helper function.
helper function should have this signature: <code>(Function, ...args: any[]) =&gt; Function</code></p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | <p>function to be wrapped with a decorator factory</p> |

<a name="throttle"></a>

## throttle(callback, [wait]) ⇒ <code>function</code>
<p>returns a throttled function which when called, waits the given period of time before passing the last call during this time to the provided callback.
call <code>.cancel()</code> on the returned function, to cancel the callback invocation.</p>

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | <p>function to be caled after the last wait period</p> |
| [wait] | <code>number</code> | <code>0</code> | <p>waiting period in ms before the callback is invoked if during this time the debounced method was not called</p> |

**Example**  
```js
window.addEventListener("resize", throttle(updateSlider, 100));
```
<a name="getValue"></a>

## ~~getValue(obj, path) ⇒ <code>\*</code>~~
***Deprecated***

<p>returns nested value without throwing an error if the parent doesn't exist</p>

**Kind**: global function  
**Returns**: <code>\*</code> - <ul>
<li>returned the found value or undefined</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | <p>object to be looked for value</p> |
| path | <code>string</code> | <p>a string with dot separated levels: e.g &quot;a.b&quot;</p> |

**Example**  
```js
const obj = {
  a: {
    b: {
      c: 1
    },
    d: true
  }
};
getValue(obj, "a.b") === {c: 1};
getValue(obj, "a.f") === undefined;
```
<a name="isEqual"></a>

## isEqual(arg1, arg2) ⇒ <code>boolean</code>
<p>compare two arguments, for object their toString values are compared</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| arg1 | <code>T</code> | 
| arg2 | <code>T</code> | 

**Example**  
```js
if (!isEqual(oldState, newState)) console.log('state changed');
```
<a name="isFilledObject"></a>

## isFilledObject(obj) ⇒ <code>boolean</code>
<p>checks if provided argument is an object which has at least one entry in it.</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| obj | <code>any</code> | 

**Example**  
```js
isFilledObject({ k: "v" }) === true;
isFilledObject({}) === false;
isFilledObject("text") === false;
```
<a name="naiveClone"></a>

## naiveClone(arg) ⇒ <code>Nullable.&lt;T&gt;</code> \| <code>Array.&lt;T&gt;</code>
<p>returns a deep link of the provided argument</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| arg | <code>Nullable.&lt;T&gt;</code> \| <code>Array.&lt;T&gt;</code> | 

**Example**  
```js
const state = naiveClone(initialState);
```
<a name="toArray"></a>

## toArray(arg) ⇒ <code>Array.&lt;T&gt;</code>
<p>returns the argument wrapped in an array if it isn't array itself</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| arg | <code>T</code> \| <code>Array.&lt;T&gt;</code> | 

**Example**  
```js
const apple = "Apple";
const fruits = toArray(apple); // ["Apple"] 
```
<a name="toString"></a>

## toString(arg) ⇒ <code>string</code>
<p>returns stringified value for the given argument</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| arg | <code>\*</code> | 

**Example**  
```js
const submitData = toString(formData);
```
<a name="getCleanString"></a>

## getCleanString(inputString) ⇒ <code>string</code>
<p>removes all multi Whitespaces and Newlines in given string</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
const article = find(document, 'aricle');
const text = getCleanString(article.innerText);
```
<a name="getWordCount"></a>

## getWordCount(text) ⇒ <code>number</code>
<p>returns number of words in a given text</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

**Example**  
```js
const article = find(document, 'aricle');
const articleWords = getWordCount(article.innerText);
```
<a name="removeAllBS"></a>

## removeAllBS(inputString) ⇒ <code>string</code>
<p>removes all Whitespaces in given string</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
removeAllBS('Hello My  World  '); // HelloMyWorld
```
<a name="removeAllNL"></a>

## removeAllNL(inputString) ⇒ <code>string</code>
<p>removes all Newlines in given string</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
const article = find(document, 'aricle');
const textString = removeAllNL(article.innerText);
```
<a name="removeMultiBS"></a>

## removeMultiBS(inputString) ⇒ <code>string</code>
<p>removes multi Whitespaces in given string</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
removeMultiBS('Hello My      World'); // Hello My World
```
<a name="toCamelCase"></a>

## toCamelCase(str) ⇒ <code>string</code>
<p>function to convert texts to camelCase for example ti generate attribute names</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>sequence of letters, dashes and spaces to be converted to camelCase</p> |

**Example**  
```js
toCamelCase("some-text") === "someText";
toCamelCase("some other text") === "someOtherText";
```
<a name="toKebabCase"></a>

## toKebabCase(str) ⇒ <code>string</code>
<p>converts the provided string to a kebab case (kebab-case)</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

**Example**  
```js
toKebabCase("keyValuePair") === "key-value-pair"
```
<a name="callback"></a>

## callback : <code>function</code>
<p>iterates over all nodes in a node list
(necessary because IE11 doesn't support .forEach  * for NodeLists)</p>

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| nodeList | <code>NodeListOf.&lt;T&gt;</code> | 
| [context] | <code>Context</code> | 

**Example**  
```js
const buttons = document.querySelectorAll('button');
forEachNode(buttons, (button, idx) => addClass(button, `my-button--${idx}`))
```


## Author

👤 **Frederik Riewerts <frederik.riewerts@gmail.com>**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_