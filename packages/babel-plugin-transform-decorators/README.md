# babel-plugin-transform-decorators

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
npm install --save-dev babel-plugin-transform-decorators
```

## Usage

Add the following line to your .babelrc file:

```json
{
  "plugins": ["transform-decorators"]
}
```

#### NOTE: Order of Plugins Matters!

If you are including your plugins manually and using `transform-class-properties`, make sure that `transform-decorators` comes *before* `transform-class-properties`.

Wrong:

```json
{
  "plugins": [
    "transform-class-properties",
    "transform-decorators"
  ]
}
```

Right:

```json
{
  "plugins": [
    "transform-decorators",
    "transform-class-properties"
  ]
}
```

### Via CLI

```sh
babel --plugins transform-decorators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-decorators"]
});
```

## References

* [Proposal: Javascript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md)
