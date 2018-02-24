# @babel/plugin-proposal-decorators

> Compile class and object decorators to ES5

## Example

(examples are from proposal)

### Simple class decorator

```js
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
```

### Class decorator

```js
@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}
```

### Class function decorator

```js
class C {
  @enumerable(false)
  method() { }
}

function enumerable(value) {
  return function (target, key, descriptor) {
     descriptor.enumerable = value;
     return descriptor;
  }
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-decorators
```

## Usage

Add the following line to your .babelrc file:

```json
{
  "plugins": ["@babel/plugin-proposal-decorators"]
}
```

#### NOTE: Order of Plugins Matters!

If you are including your plugins manually and using `@babel/plugin-proposal-class-properties`, make sure that `@babel/plugin-proposal-decorators` comes *before* `@babel/plugin-proposal-class-properties`.

Currently, `@babel/plugin-proposal-class-properties` must be used in `loose` mode to support the `@babel/plugin-proposal-decorators`. To use `@babel/plugin-proposal-class-properties` in spec mode with decorators, wait for the next major version of decorators (Stage 2).

Wrong:

```json
{
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators"
  ]
}
```

Right:

```json
{
  "plugins": [
    "@babel/plugin-proposal-decorators",
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-decorators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-decorators"]
});
```

## References

* [Proposal: JavaScript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md)
