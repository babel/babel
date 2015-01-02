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
 * [Method binding function shorthand](#method-binding-function-shorthand)
 * [Object getter memoization](#object-getter-memoization)
 * [This shorthand](#this-shorthand)

### Memoization assignment operator

The memoization assignment operator allows you to lazily set an object property.
It checks whether there's a property defined on the object and if there isn't then
the right hand value is set.

This means that `obj.x` in the following `var x = { x: undefined }; obj.x ?= 2;`
will still be `undefined` because it's already been defined on the object.

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

equivalent to

```javascript
var obj = {};
if (!Object.prototype.hasOwnProperty.call(obj, "x")) obj.x = 2;
```

### Method binding

```javascript
var fn = obj#method;
var fn = obj#method("foob");
```

equivalent to

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
