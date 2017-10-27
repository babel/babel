# @babel/plugin-syntax-numeric-separator

> Allow parsing of Numeric Literals (Decimal, Binary, Hex and Octal) that contain a _NumericLiteralSeparator_.


## Installation

```sh
npm install --save-dev @babel/plugin-syntax-numeric-separator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-numeric-separator"]
}
```

### Via CLI

```sh
babel --plugins syntax-numeric-separator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["syntax-numeric-separator"]
});
```
