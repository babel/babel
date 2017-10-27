# @babel/plugin-transform-instanceof

## Installation

```sh
npm install --save-dev @babel/plugin-transform-instanceof
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-instanceof"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-instanceof script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-instanceof"]
});
```
