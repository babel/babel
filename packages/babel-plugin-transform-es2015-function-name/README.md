# babel-plugin-transform-es2015-function-name

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
npm install --save-dev babel-plugin-transform-es2015-function-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-function-name"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-function-name script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-es2015-function-name"]
});
```
