# @babel/plugin-syntax-function-sent

> Allow parsing of the `function.sent` meta property.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-function-sent
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-function-sent"]
}
```

### Via CLI

```sh
babel --plugins syntax-function-sent script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["syntax-function-sent"]
});
```
