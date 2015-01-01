# Playground

Playground is a proving ground for **possible** ES7 proposals.

**NOTE: These features are in no way endorsed by Ecma International and are not a part of ES6. They might become a part of ECMAScript in the future.**

## Usage

    $ 6to5 --playground

```javascript
to5.transform("code", { playground: true });
```

**NOTE:** Enabling `playground` also enables [experimental support](experimental.md).

## Features

 * [Memoization operator](#memoization-operator)
 * [Method binding](#method-binding)
 * [Object getter memoization](#object-getter-memoization)
 * [This shorthand](#this-shorthand)

### Memoization assignment operator

```javascript
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

```javascript
var obj = {};
obj.x ?= 2;
```

equivalent to:

```javascript
var obj = {};
if (!Object.prototype.hasOwnProperty.call(obj, "x")) obj.x = 2;
```

### Method binding

```javascript
var fn = obj#method;
var fn = obj#method("foob");

["foo", "bar"].map(#toUpperCase); // ["FOO", "BAR"]
[1.1234, 23.53245, 3].map(#toFixed(2)); // ["1.12", "23.53", "3.00"]
```

equivalent to:

```javascript
var fn = obj.method.bind(obj);
var fn = obj.method.bind(obj, "foob");

["foo", "bar"].map(function (val) { return val.toUpperCase(); });
[1.1234, 23.53245, 3].map(function (val) { return val.toFixed(2); });
```

### Object getter memoization

```javascript
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

equivalent to

```javascript
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

### This shorthand

```javascript
@foo
```

equivalent to

```javascirpt
this.foo
```
