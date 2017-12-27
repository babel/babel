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
  "plugins": ["@babel/plugin-transform-instanceof"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-instanceof script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-instanceof"]
});
```
