# @babel/plugin-transform-function-name

> Apply ES2015 function.name semantics to all functions

## Examples

**In**

```javascript
let number = (x) => x
```

**Out**

```javascript
var number = function number(x) {
  return x;
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-function-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-function-name"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-function-name script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-function-name"]
});
```
