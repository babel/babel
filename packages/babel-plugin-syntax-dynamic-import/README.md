# @babel/plugin-syntax-dynamic-import

> Allow parsing of `import()`.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/syntax-dynamic-import"]
}
```

### Via CLI

```sh
babel --plugins @babel/syntax-dynamic-import script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/syntax-dynamic-import"]
});
```
