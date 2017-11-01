# @babel/plugin-syntax-flow



## Installation

```sh
npm install --save-dev @babel/plugin-syntax-flow
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/syntax-flow"]
}
```

### Via CLI

```sh
babel --plugins @babel/syntax-flow script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/syntax-flow"]
});
```
