# @babel/plugin-syntax-json-strings

Allow parsing of the U+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR in JS strings

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-json-strings
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-json-strings"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-json-strings script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-json-strings"]
});
```
