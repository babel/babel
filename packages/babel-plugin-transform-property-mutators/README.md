# @babel/plugin-transform-property-mutators

> This plugin allows Babel to transform [object initializer mutators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Method_definitions) into `Object.defineProperties`.

## Example

**In**

```javascript
var foo = {
  get bar() {
    return "bar";
  }
};
```

**Out**

```javascript
var foo = Object.defineProperties({}, {
  bar: {
    get: function () {
      return "bar";
    },
    enumerable: true,
    configurable: true
  }
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-property-mutators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-property-mutators"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-property-mutators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-property-mutators"]
});
```
