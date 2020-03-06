<h1 align="center">Welcome to @kluntje/js-utils 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: (Apache)" src="https://img.shields.io/badge/License-Apache_2.0-yellow.svg" />
  </a>
</p>

> Kluntje/js-utils is a collection of really usefull js functions that can be imported in any project and speed up your daily javascript tasks.

## Install

```sh
npm install @kuntje/js-utils
```

## Constants

<dl>
<dt><a href="#fetchJSON">fetchJSON</a> ⇒ <code>Promise.&lt;T&gt;</code></dt>
<dd><p>Calls API and returns JSON as Promise</p>
</dd>
<dt><a href="#hasElement">hasElement</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, if element is in given array</p>
</dd>
<dt><a href="#isFilledArray">isFilledArray</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, whether given Array exists and has at least one element</p>
</dd>
<dt><a href="#mergeArraysBy">mergeArraysBy</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>merge two given arrays by the given checker function</p>
</dd>
<dt><a href="#pushIfNew">pushIfNew</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>pushes new Element to given array, if its not already in it</p>
</dd>
<dt><a href="#removeItem">removeItem</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>removes specific Item from array and return new array</p>
</dd>
<dt><a href="#addDays">addDays</a> ⇒ <code>Date</code></dt>
<dd><p>Adds given amount of days to given date</p>
</dd>
<dt><a href="#addLeadingZero">addLeadingZero</a> ⇒ <code>string</code></dt>
<dd><p>Optionally Adds leading Zero to Numbers &lt; 10</p>
</dd>
<dt><a href="#isEqualDate">isEqualDate</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks whether given dates are equal</p>
</dd>
<dt><a href="#sanitizeDateGMTOffset">sanitizeDateGMTOffset</a> ⇒ <code>string</code></dt>
<dd><p>Helper to make date parsing cross browser compatible
Some browsers (e.g. Safari) need the GMT offset part to be in format &quot;+00:00&quot;
This helper makes sure that any present GMT offset follows that format and can safely be parsed:
Date.parse(&quot;2020-01-01T12:13:14.000+0200&quot;) // throws error in Safari
Date.parse(&quot;2020-01-01T12:13:14.000+02:00&quot;) // succes</p>
</dd>
<dt><a href="#addClass">addClass</a></dt>
<dd><p>adds given classes to one or multiple elements</p>
</dd>
<dt><a href="#find">find</a> ⇒ <code>Element</code> | <code>null</code></dt>
<dd><p>returns the first child of a specific parent matching the given selector</p>
</dd>
<dt><a href="#findAll">findAll</a> ⇒ <code>Array.&lt;Element&gt;</code></dt>
<dd><p>returns all children of a specific parent matching the given selector</p>
</dd>
<dt><a href="#getCurrentMQ">getCurrentMQ</a> ⇒ <code>string</code></dt>
<dd><p>returns current mediaQuery-name. e.g. &quot;MQ2&quot;</p>
</dd>
<dt><a href="#getInnerText">getInnerText</a> ⇒ <code>string</code></dt>
<dd><p>returns innerText of given Element</p>
</dd>
<dt><a href="#getParent">getParent</a> ⇒ <code>Element</code> | <code>null</code></dt>
<dd><p>returns parent of specific class, if found</p>
</dd>
<dt><a href="#getUniqueID">getUniqueID</a> ⇒ <code>string</code></dt>
<dd><p>returns a random String to be used as ID</p>
</dd>
<dt><a href="#hasChild">hasChild</a> ⇒ <code>boolean</code></dt>
<dd><p>returns if a specific parent has a child matching the given selector</p>
</dd>
<dt><a href="#hasClass">hasClass</a> ⇒ <code>boolean</code></dt>
<dd><p>returns if a specific element has given class</p>
</dd>
<dt><a href="#inViewport">inViewport</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, whether an element is in the viewport</p>
</dd>
<dt><a href="#isNodeList">isNodeList</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, if target is NodeList</p>
</dd>
<dt><a href="#onEvent">onEvent</a></dt>
<dd><p>adds event with given parameters</p>
</dd>
<dt><a href="#removeChildren">removeChildren</a></dt>
<dd><p>removes all children of a specific parent matching the given selector</p>
</dd>
<dt><a href="#removeClass">removeClass</a></dt>
<dd><p>removes given class from element</p>
</dd>
<dt><a href="#removeEvent">removeEvent</a></dt>
<dd><p>removes event with given parameters</p>
</dd>
<dt><a href="#toggleClass">toggleClass</a></dt>
<dd><p>toggles given class on given element</p>
</dd>
<dt><a href="#waitFor">waitFor</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>resolves Promise after given timeout</p>
</dd>
<dt><a href="#waitForEvent">waitForEvent</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>waits for given event for a (optional) max-timeout</p>
</dd>
<dt><del><a href="#getValue">getValue</a> ⇒ <code>*</code></del></dt>
<dd><p>returns nested value without throwing an error if the parent doesn&#39;t exist</p>
</dd>
<dt><a href="#isEqual">isEqual</a> ⇒ <code>boolean</code></dt>
<dd><p>compare two arguments, for object their toString values are compared</p>
</dd>
<dt><a href="#toArray">toArray</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>returns the argument wrapped in an array if it isn&#39;t array itself</p>
</dd>
<dt><a href="#toString">toString</a> ⇒ <code>string</code></dt>
<dd><p>returns stringified value for the given argument</p>
</dd>
<dt><a href="#getCleanString">getCleanString</a> ⇒ <code>string</code></dt>
<dd><p>removes all multi Whitespaces and Newlines in given string</p>
</dd>
<dt><a href="#getWordCount">getWordCount</a> ⇒ <code>number</code></dt>
<dd><p>returns number of words in a given text</p>
</dd>
<dt><a href="#removeAllBS">removeAllBS</a> ⇒ <code>string</code></dt>
<dd><p>removes all Whitespaces in given string</p>
</dd>
<dt><a href="#removeAllNL">removeAllNL</a> ⇒ <code>string</code></dt>
<dd><p>removes all Newlines in given string</p>
</dd>
<dt><a href="#removeMultiBS">removeMultiBS</a> ⇒ <code>string</code></dt>
<dd><p>removes multi Whitespaces in given string</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#callback">callback(node, index)</a> ⇒</dt>
<dd></dd>
<dt><a href="#debounce">debounce(callback, [wait])</a> ⇒ <code>function</code></dt>
<dd><p>returns a debounced function which when called multiple of times each time it waits the waiting duration
and if the method was not called during this time, the last call will be passed to the callback.</p>
</dd>
<dt><a href="#throttle">throttle(callback, [wait])</a> ⇒ <code>function</code></dt>
<dd><p>returns a throttled function which when called, waits the given period of time before passing the last call during this time to the provided callback.
call <code>.cancel()</code> on the returned function, to cancel the callback invokation.</p>
</dd>
<dt><a href="#naiveClone">naiveClone(arg)</a> ⇒ <code>Nullable.&lt;T&gt;</code> | <code>Array.&lt;T&gt;</code></dt>
<dd><p>returns a deep link of the provided argument</p>
</dd>
<dt><a href="#toCamelCase">toCamelCase(str)</a> ⇒ <code>string</code></dt>
<dd><p>function to convert texts to camelCase for example ti generate attribute names</p>
</dd>
<dt><a href="#toKebabCase">toKebabCase(str)</a> ⇒ <code>string</code></dt>
<dd><p>converts the provided string to a kebab case (kebab-case)</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#callback">callback</a> : <code>function</code></dt>
<dd><p>iterates over all nodes in a node list
(necessary because IE11 doesn&#39;t support .forEach  * for NodeLists)</p>
</dd>
</dl>

<a name="fetchJSON"></a>

## fetchJSON ⇒ <code>Promise.&lt;T&gt;</code>
Calls API and returns JSON as Promise

**Kind**: global constant  

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

## hasElement ⇒ <code>boolean</code>
checks, if element is in given array

**Kind**: global constant  

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

## isFilledArray ⇒ <code>boolean</code>
checks, whether given Array exists and has at least one element

**Kind**: global constant  

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

## mergeArraysBy ⇒ <code>Array.&lt;T&gt;</code>
merge two given arrays by the given checker function

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| array1 | <code>Array.&lt;T&gt;</code> |  |
| array2 | <code>Array.&lt;T&gt;</code> |  |
| checker | <code>function</code> | if this function returns true for a specific element combination the elements are getting merged |

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

## pushIfNew ⇒ <code>Array.&lt;T&gt;</code>
pushes new Element to given array, if its not already in it

**Kind**: global constant  

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

## removeItem ⇒ <code>Array.&lt;T&gt;</code>
removes specific Item from array and return new array

**Kind**: global constant  

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

## addDays ⇒ <code>Date</code>
Adds given amount of days to given date

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> |  |
| daysToAdd | <code>number</code> |  |
| [zeroHours] | <code>boolean</code> | set time to 0:00:00 |

**Example**  
```js
const today = new Date();
const tomorrow = addDays(today, 2);
```
<a name="addLeadingZero"></a>

## addLeadingZero ⇒ <code>string</code>
Optionally Adds leading Zero to Numbers < 10

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inNumber | <code>number</code> | 

**Example**  
```js
const today = new Date();
const formattedDateSting = `${addLeadingZero(today.getDate())}.${addLeadingZero(today.getMonth() + 1)}.${today.getFullYear()}`;
```
<a name="isEqualDate"></a>

## isEqualDate ⇒ <code>boolean</code>
Checks whether given dates are equal

**Kind**: global constant  

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

## sanitizeDateGMTOffset ⇒ <code>string</code>
Helper to make date parsing cross browser compatible
Some browsers (e.g. Safari) need the GMT offset part to be in format "+00:00"
This helper makes sure that any present GMT offset follows that format and can safely be parsed:
Date.parse("2020-01-01T12:13:14.000+0200") // throws error in Safari
Date.parse("2020-01-01T12:13:14.000+02:00") // succes

**Kind**: global constant  
**Returns**: <code>string</code> - correctly formatted date  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | date string to be sanitized for parsing |

**Example**  
```js
sanitizeDateGMTOffset("2020-01-01T12:13:14.000+0200") // "2020-01-01T12:13:14.000+02:00"
```
<a name="addClass"></a>

## addClass
adds given classes to one or multiple elements

**Kind**: global constant  

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

## find ⇒ <code>Element</code> \| <code>null</code>
returns the first child of a specific parent matching the given selector

**Kind**: global constant  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> \| <code>Document</code> \| <code>null</code> | 
| selector | <code>string</code> | 

**Example**  
```js
const input = find(document, 'input');
```
<a name="findAll"></a>

## findAll ⇒ <code>Array.&lt;Element&gt;</code>
returns all children of a specific parent matching the given selector

**Kind**: global constant  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> \| <code>Document</code> \| <code>null</code> | 
| selector | <code>string</code> | 

**Example**  
```js
const inputs = findAll(document, 'input');
```
<a name="getCurrentMQ"></a>

## getCurrentMQ ⇒ <code>string</code>
returns current mediaQuery-name. e.g. "MQ2"

**Kind**: global constant  
**Returns**: <code>string</code> - - mediaQuery name e.g. MQ1  

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

## getInnerText ⇒ <code>string</code>
returns innerText of given Element

**Kind**: global constant  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

**Example**  
```js
const myArticle = document.querySelector('article');
const articleText = getInnerText(myArticle);
```
<a name="getParent"></a>

## getParent ⇒ <code>Element</code> \| <code>null</code>
returns parent of specific class, if found

**Kind**: global constant  

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

## getUniqueID ⇒ <code>string</code>
returns a random String to be used as ID

**Kind**: global constant  
<a name="hasChild"></a>

## hasChild ⇒ <code>boolean</code>
returns if a specific parent has a child matching the given selector

**Kind**: global constant  

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

## hasClass ⇒ <code>boolean</code>
returns if a specific element has given class

**Kind**: global constant  

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

## inViewport ⇒ <code>boolean</code>
checks, whether an element is in the viewport

**Kind**: global constant  

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

## isNodeList ⇒ <code>boolean</code>
checks, if target is NodeList

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>any</code> | 

<a name="onEvent"></a>

## onEvent
adds event with given parameters

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>EventTarget</code> \| <code>null</code> | 
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 
| handler | <code>function</code> | 
| context | <code>Context</code> | 

**Example**  
```js
const buttons = findAll(document, 'button);
onEvent(buttons, 'click', () => console.log('button clicked'), this);
```
<a name="removeChildren"></a>

## removeChildren
removes all children of a specific parent matching the given selector

**Kind**: global constant  

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

## removeClass
removes given class from element

**Kind**: global constant  

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

## removeEvent
removes event with given parameters

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>HTMLElement</code> \| <code>Iterable.&lt;HTMLElement&gt;</code> | 
| events | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 
| handler | <code>function</code> | 
| context | <code>Context</code> | 

**Example**  
```js
const buttons = findAll(document, 'button);
removeEvent(buttons, 'click', () => console.log('button clicked'), this);
```
<a name="toggleClass"></a>

## toggleClass
toggles given class on given element

**Kind**: global constant  

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

## waitFor ⇒ <code>Promise.&lt;void&gt;</code>
resolves Promise after given timeout

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>number</code> | timeout in milliseconds |

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

## waitForEvent ⇒ <code>Promise.&lt;void&gt;</code>
waits for given event for a (optional) max-timeout

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>HTMLElement</code> |  |
| eventName | <code>string</code> |  |
| timeout | <code>number</code> | timeout in milliseconds |

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
<a name="getValue"></a>

## ~~getValue ⇒ <code>\*</code>~~
***Deprecated***

returns nested value without throwing an error if the parent doesn't exist

**Kind**: global constant  
**Returns**: <code>\*</code> - - returned the found value or undefined  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to be looked for value |
| path | <code>string</code> | a string with dot separated levels: e.g "a.b" |

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

## isEqual ⇒ <code>boolean</code>
compare two arguments, for object their toString values are compared

**Kind**: global constant  

| Param | Type |
| --- | --- |
| arg1 | <code>T</code> | 
| arg2 | <code>T</code> | 

**Example**  
```js
if (!isEqual(oldState, newState)) console.log('state changed');
```
<a name="toArray"></a>

## toArray ⇒ <code>Array.&lt;T&gt;</code>
returns the argument wrapped in an array if it isn't array itself

**Kind**: global constant  

| Param | Type |
| --- | --- |
| arg | <code>T</code> \| <code>Array.&lt;T&gt;</code> | 

**Example**  
```js
const apple = "Apple";
const fruits = toArray(apple); // ["Apple"]
```
<a name="toString"></a>

## toString ⇒ <code>string</code>
returns stringified value for the given argument

**Kind**: global constant  

| Param | Type |
| --- | --- |
| arg | <code>\*</code> | 

**Example**  
```js
const submitData = toString(formData);
```
<a name="getCleanString"></a>

## getCleanString ⇒ <code>string</code>
removes all multi Whitespaces and Newlines in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
const article = find(document, 'aricle');
const text = getCleanString(article.innerText);
```
<a name="getWordCount"></a>

## getWordCount ⇒ <code>number</code>
returns number of words in a given text

**Kind**: global constant  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

**Example**  
```js
const article = find(document, 'aricle');
const articleWords = getWordCount(article.innerText);
```
<a name="removeAllBS"></a>

## removeAllBS ⇒ <code>string</code>
removes all Whitespaces in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
removeAllBS('Hello My  World  '); // HelloMyWorld
```
<a name="removeAllNL"></a>

## removeAllNL ⇒ <code>string</code>
removes all Newlines in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
const article = find(document, 'aricle');
const textString = removeAllNL(article.innerText);
```
<a name="removeMultiBS"></a>

## removeMultiBS ⇒ <code>string</code>
removes multi Whitespaces in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

**Example**  
```js
removeMultiBS('Hello My      World'); // Hello My World
```
<a name="callback"></a>

## callback(node, index) ⇒
**Kind**: global function  
**Returns**: any  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 
| index | <code>Number</code> | 

<a name="debounce"></a>

## debounce(callback, [wait]) ⇒ <code>function</code>
returns a debounced function which when called multiple of times each time it waits the waiting duration
and if the method was not called during this time, the last call will be passed to the callback.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | function to be caled after the last wait period |
| [wait] | <code>number</code> | <code>0</code> | waiting period in ms before the callback is invoked if during this time the debounced method was not called |

**Example**  
```js
const debounced = debounce(console.log, 500);
  debonced("Hi");
  debonced("Hello");
  debonced("Hey");
  if (neverMind) debonced.cancel;
  // logs only "Hey"


  // or instead of decorator on class methods
  Class Component {
    constructor() {
         window.addEventListener("resize", this.resizeHandler);
    }

    resizeHandler = throttle(event => {
      // event handlers logic
    }, 100);
  }
```
<a name="throttle"></a>

## throttle(callback, [wait]) ⇒ <code>function</code>
returns a throttled function which when called, waits the given period of time before passing the last call during this time to the provided callback.
call `.cancel()` on the returned function, to cancel the callback invokation.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | function to be caled after the last wait period |
| [wait] | <code>number</code> | <code>0</code> | waiting period in ms before the callback is invoked if during this time the debounced method was not called |

**Example**  
```js
window.addEventListener("resize", throttle(updateSlider, 100));
```
<a name="naiveClone"></a>

## naiveClone(arg) ⇒ <code>Nullable.&lt;T&gt;</code> \| <code>Array.&lt;T&gt;</code>
returns a deep link of the provided argument

**Kind**: global function  

| Param | Type |
| --- | --- |
| arg | <code>Nullable.&lt;T&gt;</code> \| <code>Array.&lt;T&gt;</code> | 

**Example**  
```js
const state = naiveClone(initialState);
```
<a name="toCamelCase"></a>

## toCamelCase(str) ⇒ <code>string</code>
function to convert texts to camelCase for example ti generate attribute names

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | sequence of letters, dashes and spaces to be converted to camelCase |

**Example**  
```js
toCamelCase("some-text") === "someText";
toCamelCase("some other text") === "someOtherText";
```
<a name="toKebabCase"></a>

## toKebabCase(str) ⇒ <code>string</code>
converts the provided string to a kebab case (kebab-case)

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
iterates over all nodes in a node list
(necessary because IE11 doesn't support .forEach  * for NodeLists)

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