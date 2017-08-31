# babel-plugin-syntax-do-expressions

> Allow parsing of do expressions.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-do-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-do-expressions"]
}
```

### Via CLI

```sh
babel --plugins syntax-do-expressions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-do-expressions"]
});
```
