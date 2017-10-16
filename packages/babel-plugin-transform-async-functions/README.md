# babel-plugin-transform-async-functions

> Compile async functions to ES5

## Installation

```sh
npm install --save-dev @babel/plugin-transform-async-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-async-functions"]
}
```

### Via CLI

```sh
babel --plugins transform-async-functions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-async-functions"]
});
```
