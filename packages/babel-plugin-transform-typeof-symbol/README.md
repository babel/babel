# @babel/plugin-transform-typeof-symbol

> ES6 introduces a new native type called [symbols](https://babeljs.io/learn-es2015/#ecmascript-2015-features-symbols). This transformer wraps all `typeof` expressions with a method that replicates native behaviour. (ie. returning "symbol" for symbols)

## Example

**In**

```javascript
typeof Symbol() === "symbol";
```

**Out**

```javascript
var _typeof = function (obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
};

_typeof(Symbol()) === "symbol";
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-typeof-symbol
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-typeof-symbol"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-typeof-symbol script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-typeof-symbol"]
});
```
