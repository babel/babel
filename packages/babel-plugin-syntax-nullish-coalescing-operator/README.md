# @babel/plugin-syntax-nullish-coalescing-operator

> Allow parsing of the nullish-coalescing operator.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-nullish-coalescing-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-nullish-coalescing-operator"]
}
```

### Via CLI

```sh
babel --plugins syntax-nullish-coalescing-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["syntax-nullish-coalescing-operator"]
});
```
