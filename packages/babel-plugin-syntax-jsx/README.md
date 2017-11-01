# @babel/plugin-syntax-jsx

> Allow parsing of JSX

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/syntax-jsx"]
}
```

### Via CLI

```sh
babel --plugins @babel/syntax-jsx script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/syntax-jsx"]
});
```
