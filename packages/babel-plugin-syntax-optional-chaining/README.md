# @babel/plugin-syntax-optional-chaining

Allow parsing of optional properties.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-optional-chaining
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/syntax-optional-chaining"]
}
```

### Via CLI

```sh
babel --plugins @babel/syntax-optional-chaining script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/syntax-optional-chaining"]
});
```
