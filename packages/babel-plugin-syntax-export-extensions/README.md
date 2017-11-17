# @babel/plugin-syntax-export-extensions

> Allow parsing of export extensions.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-export-extensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-export-extensions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-export-extensions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-export-extensions"]
});
```
