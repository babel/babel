# @babel/plugin-syntax-function-bind

> Allow parsing of function bind.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-function-bind
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/syntax-function-bind"]
}
```

### Via CLI

```sh
babel --plugins @babel/syntax-function-bind script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/syntax-function-bind"]
});
```
