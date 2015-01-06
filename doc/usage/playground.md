---
layout: docs
title: Playground
description: How to use the playground.
permalink: /docs/usage/playground/
redirect_from: /playground.html
---

> Playground is a proving ground for language ideas.

<blockquote class="to5-callout to5-callout-danger">
  <h4>Unofficial</h4>
  <p>
    These features are in no way endorsed by Ecma International and are not a
    part of any ECMAScript standard, nor are they necessarily on track to become
    part of any standard. <strong><em>Use with extreme caution</em></strong>.
  </p>
</blockquote>

<blockquote class="to5-callout to5-callout-info">
  <h4>Proposal Authors</h4>
  <p>
    If you are actively working on an
    <a href="https://github.com/tc39/ecma262">ECMAScript proposal</a>, this is a
    good place to get your ideas implemented with so that they may be tested
    with all of the latest language and API features.
  </p>
  <p>
    Please feel free to <a href="https://github.com/6to5/6to5/issues/new">open
    an issue</a> on the 6to5 repository with your WIP spec, and we can discuss
    getting it implemented. Be sure to include as much information as possible.
  </p>
</blockquote>

## Usage

```js
$ 6to5 --playground
```

```js
to5.transform('code', { playground: true });
```

<blockquote class="to5-callout to5-callout-info">
  <h4>Enables experimental</h4>
  <p>
    Enabling playground also enables experimental support.
  </p>
</blockquote>

## Features

### Memoization assignment operator

The memoization assignment operator allows you to lazily set an object property.
It checks whether there's a property defined on the object and if there isn't
then the right hand value is set.

This means that `obj.x` in the following `var x = { x: undefined }; obj.x ?= 2;``
will still be `undefined` because it's already been defined on the object.

**Uses**

```js
var obj = {};
obj.x ?= 2;
obj.x; // 2

obj = { x: 1 };
obj.x ?= 2;
obj.x; // 1

obj = { x: undefined }
obj.x ?= 2;
obj.x; // undefined
```

**Example**

```js
var obj = {};
obj.x ?= 2;
```

is equivalent to

```js
var obj = {};
if (!Object.prototype.hasOwnProperty.call(obj, 'x')) obj.x = 2;
```

### Method binding

```javascript
var fn = obj#method;
var fn = obj#method("foob");
```

is equivalent to

```javascript
var fn = obj.method.bind(obj);
var fn = obj.method.bind(obj, "foob");
```

### Method binding function shorthand

```javascript
["foo", "bar"].map(#toUpperCase); // ["FOO", "BAR"]
[1.1234, 23.53245, 3].map(#toFixed(2)); // ["1.12", "23.53", "3.00"]
```

equivalent to

```javascript
["foo", "bar"].map(function (val) { return val.toUpperCase(); });
[1.1234, 23.53245, 3].map(function (val) { return val.toFixed(2); });
```

### Object getter memoization

```js
var foo = {
  memo bar() {
    return complex();
  }
};

class Foo {
  memo bar() {
    return complex();
  }
}
```

is equivalent to

```js
var foo = {
  get bar() {
    return Object.defineProperty(this, "bar", {
      value: complex(),
      enumerable: true,
      configurable: true,
      writable: true
    }).bar;
  }
};

class Foo {
  get bar() {
    return Object.defineProperty(this, "bar", {
      value: complex(),
      enumerable: true,
      configurable: true,
      writable: true
    }).bar;
  }
}
```
