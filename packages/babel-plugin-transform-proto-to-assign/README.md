# @babel/plugin-transform-proto-to-assign

> This plugin allows Babel to transform all `__proto__` assignments to a method that will do a shallow copy of all properties.

## Detail

This means that the following **will** work:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
bar.b; // 2
```

however the following **will not**:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
foo.a = 2;
bar.a; // 1 - should be 2 but remember that nothing is bound and it's a straight copy
```

This is a case that you have to be aware of if you intend to use this plugin.

## Example

**In**

```javascript
bar.__proto__ = foo;
```

**Out**

```javascript
function _defaults(obj, defaults) { ... }

_defaults(bar, foo);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-proto-to-assign
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-proto-to-assign"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-proto-to-assign script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-proto-to-assign"]
});
```

## References

* [MDN: Object.prototype.\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
