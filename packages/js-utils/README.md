<h1 align="center">Welcome to @kluntje/js-utils 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

>> Kluntje/js-utils is a collection of really usefull js functions that can be imported in any project and speed up your daily javascript tasks.

## Install

```sh
npm install @kuntje/js-utils
```

## Constants

<dl>
<dt><a href="#fetchJSON">fetchJSON</a> ⇒ <code>Promise</code></dt>
<dd><p>Calls API and returns JSON as Promise</p>
</dd>
<dt><a href="#hasElement">hasElement</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, if element is in given array</p>
</dd>
<dt><a href="#isFilledArray">isFilledArray</a> ⇒ <code>boolean</code></dt>
<dd><p>checks, whether given Array exists, has at least one element</p>
</dd>
<dt><a href="#mergeArraysBy">mergeArraysBy</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>merge two given arrays by the given checker function</p>
</dd>
<dt><a href="#pushIfNew">pushIfNew</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>pushes new Element to given array, if its not already in it</p>
</dd>
<dt><a href="#removeItem">removeItem</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
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
<dt><a href="#addClass">addClass</a></dt>
<dd><p>adds given classes to one or multiple elements</p>
</dd>
<dt><a href="#find">find</a> ⇒ <code>Element</code> | <code>null</code></dt>
<dd><p>returns the first child of a specific parent matching the given selector</p>
</dd>
<dt><a href="#findAll">findAll</a> ⇒ <code>NodeListOf.&lt;Element&gt;</code></dt>
<dd><p>returns all children of a specific parent matching the given selector</p>
</dd>
<dt><a href="#forEachNode">forEachNode</a> ⇒ <code>boolean</code></dt>
<dd><p>iterates over all nodes in a node list
(necessary because IE11 doesn&#39;t support .forEach  * for NodeLists)</p>
</dd>
<dt><a href="#getCurrentMQ">getCurrentMQ</a> ⇒ <code>mediaQuery</code></dt>
<dd><p>returns current mediaQuery name. e.g. &quot;MQ2&quot;</p>
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
<dd><p>waits for given timeout</p>
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
<dt><a href="#toArray">toArray</a> ⇒ <code>Array</code></dt>
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
<dt><a href="#naiveClone">naiveClone(arg)</a> ⇒ <code>any</code></dt>
<dd><p>returns a deep link of the provided argument</p>
</dd>
</dl>

<a name="fetchJSON"></a>

## fetchJSON ⇒ <code>Promise</code>
Calls API and returns JSON as Promise

**Kind**: global constant  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>RequestInit</code> | 

<a name="hasElement"></a>

## hasElement ⇒ <code>boolean</code>
checks, if element is in given array

**Kind**: global constant  

| Param | Type |
| --- | --- |
| array | <code>Array</code> | 
| element | <code>\*</code> | 

<a name="isFilledArray"></a>

## isFilledArray ⇒ <code>boolean</code>
checks, whether given Array exists, has at least one element

**Kind**: global constant  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;any&gt;</code> | 

<a name="mergeArraysBy"></a>

## mergeArraysBy ⇒ <code>Array.&lt;any&gt;</code>
merge two given arrays by the given checker function

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| array1 | <code>Array.&lt;any&gt;</code> |  |
| array2 | <code>Array.&lt;any&gt;</code> |  |
| checker | <code>function</code> | if this function returns true for a specific element combination the elements are getting merged |

<a name="pushIfNew"></a>

## pushIfNew ⇒ <code>Array.&lt;any&gt;</code>
pushes new Element to given array, if its not already in it

**Kind**: global constant  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;any&gt;</code> | 
| newElement | <code>any</code> | 

<a name="removeItem"></a>

## removeItem ⇒ <code>Array.&lt;any&gt;</code>
removes specific Item from array and return new array

**Kind**: global constant  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;any&gt;</code> | 
| itemToRemove | <code>any</code> | 

<a name="addDays"></a>

## addDays ⇒ <code>Date</code>
Adds given amount of days to given date

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> |  |
| daysToAdd | <code>number</code> |  |
| zeroHours | <code>boolean</code> | set time to 0:00:00 |

<a name="addLeadingZero"></a>

## addLeadingZero ⇒ <code>string</code>
Optionally Adds leading Zero to Numbers < 10

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inNumber | <code>number</code> | 

<a name="isEqualDate"></a>

## isEqualDate ⇒ <code>boolean</code>
Checks whether given dates are equal

**Kind**: global constant  

| Param | Type |
| --- | --- |
| dateA | <code>Date</code> | 
| dateB | <code>Date</code> | 

<a name="addClass"></a>

## addClass
adds given classes to one or multiple elements

**Kind**: global constant  

| Param | Type |
| --- | --- |
| elements | <code>Element</code> \| <code>Iterable.&lt;Element&gt;</code> \| <code>NodeListOf.&lt;Element&gt;</code> \| <code>null</code> | 
| ...classNames | <code>string</code> | 

<a name="find"></a>

## find ⇒ <code>Element</code> \| <code>null</code>
returns the first child of a specific parent matching the given selector

**Kind**: global constant  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> \| <code>Document</code> \| <code>null</code> | 
| selector | <code>string</code> | 

<a name="findAll"></a>

## findAll ⇒ <code>NodeListOf.&lt;Element&gt;</code>
returns all children of a specific parent matching the given selector

**Kind**: global constant  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> \| <code>Document</code> \| <code>null</code> | 
| selector | <code>string</code> | 

<a name="forEachNode"></a>

## forEachNode ⇒ <code>boolean</code>
iterates over all nodes in a node list
(necessary because IE11 doesn't support .forEach  * for NodeLists)

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>\*</code> | 

<a name="getCurrentMQ"></a>

## getCurrentMQ ⇒ <code>mediaQuery</code>
returns current mediaQuery name. e.g. "MQ2"

**Kind**: global constant  
**Returns**: <code>mediaQuery</code> - - mq name  
<a name="getInnerText"></a>

## getInnerText ⇒ <code>string</code>
returns innerText of given Element

**Kind**: global constant  

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> | 

<a name="getParent"></a>

## getParent ⇒ <code>Element</code> \| <code>null</code>
returns parent of specific class, if found

**Kind**: global constant  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| parentSelector | <code>string</code> | 

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

<a name="hasClass"></a>

## hasClass ⇒ <code>boolean</code>
returns if a specific element has given class

**Kind**: global constant  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| className | <code>string</code> | 

<a name="inViewport"></a>

## inViewport ⇒ <code>boolean</code>
checks, whether an element is in the viewport

**Kind**: global constant  

| Param | Type |
| --- | --- |
| element | <code>Element</code> | 
| parent | <code>Element</code> | 

<a name="isNodeList"></a>

## isNodeList ⇒ <code>boolean</code>
checks, if target is NodeList

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>\*</code> | 

<a name="onEvent"></a>

## onEvent
adds event with given parameters

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>HTMLElement</code> \| <code>Iterable.&lt;HTMLElement&gt;</code> | 
| events | <code>string</code> | 
| handler | <code>function</code> | 
| context | <code>Context</code> | 

<a name="removeChildren"></a>

## removeChildren
removes all children of a specific parent matching the given selector

**Kind**: global constant  

| Param | Type |
| --- | --- |
| parent | <code>Element</code> | 
| selector | <code>string</code> | 

<a name="removeClass"></a>

## removeClass
removes given class from element

**Kind**: global constant  

| Param | Type |
| --- | --- |
| elements | <code>Element</code> \| <code>Iterable.&lt;Element&gt;</code> \| <code>NodeListOf.&lt;Element&gt;</code> \| <code>null</code> | 
| ...classNames | <code>string</code> | 

<a name="removeEvent"></a>

## removeEvent
removes event with given parameters

**Kind**: global constant  

| Param | Type |
| --- | --- |
| target | <code>HTMLElement</code> \| <code>Iterable.&lt;HTMLElement&gt;</code> | 
| events | <code>string</code> | 
| handler | <code>function</code> | 
| context | <code>Context</code> | 

<a name="toggleClass"></a>

## toggleClass
toggles given class on given element

**Kind**: global constant  

| Param | Type |
| --- | --- |
| elements | <code>Element</code> \| <code>Iterable.&lt;Element&gt;</code> \| <code>NodeListOf.&lt;Element&gt;</code> | 
| className | <code>string</code> | 
| add | <code>boolean</code> | 

<a name="waitFor"></a>

## waitFor ⇒ <code>Promise.&lt;void&gt;</code>
waits for given timeout

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>number</code> | timeout in milliseconds |

<a name="waitForEvent"></a>

## waitForEvent ⇒ <code>Promise.&lt;void&gt;</code>
waits for given event for a (optional) max-timeout

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>HTMLElement</code> |  |
| eventName | <code>string</code> |  |
| timeout | <code>number</code> | timeout in milliseconds |

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
| arg1 | <code>\*</code> | 
| arg2 | <code>\*</code> | 

<a name="toArray"></a>

## toArray ⇒ <code>Array</code>
returns the argument wrapped in an array if it isn't array itself

**Kind**: global constant  

| Param | Type |
| --- | --- |
| arg | <code>\*</code> | 

<a name="toString"></a>

## toString ⇒ <code>string</code>
returns stringified value for the given argument

**Kind**: global constant  

| Param | Type |
| --- | --- |
| arg | <code>\*</code> | 

<a name="getCleanString"></a>

## getCleanString ⇒ <code>string</code>
removes all multi Whitespaces and Newlines in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

<a name="getWordCount"></a>

## getWordCount ⇒ <code>number</code>
returns number of words in a given text

**Kind**: global constant  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="removeAllBS"></a>

## removeAllBS ⇒ <code>string</code>
removes all Whitespaces in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

<a name="removeAllNL"></a>

## removeAllNL ⇒ <code>string</code>
removes all Newlines in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

<a name="removeMultiBS"></a>

## removeMultiBS ⇒ <code>string</code>
removes multi Whitespaces in given string

**Kind**: global constant  

| Param | Type |
| --- | --- |
| inputString | <code>string</code> | 

<a name="naiveClone"></a>

## naiveClone(arg) ⇒ <code>any</code>
returns a deep link of the provided argument

**Kind**: global function  

| Param | Type |
| --- | --- |
| arg | <code>any</code> | 



## Author

👤 **Frederik Riewerts <frederik.riewerts@gmail.com>**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_