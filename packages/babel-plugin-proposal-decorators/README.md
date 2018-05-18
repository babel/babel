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

## Options

### `automaticParentheses`

`boolean`, defaults to `false`.

When this option is `true`, the parentheses of a decorator which doesn't get any
argument are optional. The following examples are equivalent:

```js
@dec
class Foo {}

@dec()
class Foo {}
```

This option is not compatible with legacy decorators.

### `legacy`

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax and behavior.

#### NOTE: Compatibility with `@babel/plugin-proposal-class-properties`

If you are including your plugins manually and using `@babel/plugin-proposal-class-properties`, make sure that `@babel/plugin-proposal-decorators` comes *before* `@babel/plugin-proposal-class-properties`.

When using the `legacy: true` mode, `@babel/plugin-proposal-class-properties` must be used in `loose` mode to support the `@babel/plugin-proposal-decorators`.

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
    "@babel/plugin-proposal-class-properties"
  ]
}
```

```json
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

## References

* [Proposal: JavaScript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md)
