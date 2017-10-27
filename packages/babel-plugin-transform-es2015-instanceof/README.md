# @babel/plugin-transform-es2015-instanceof

## Installation

```sh
npm install --save-dev @babel/plugin-transform-es2015-instanceof
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-es2015-instanceof"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-es2015-instanceof script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-es2015-instanceof"]
});
```
