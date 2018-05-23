# @babel/plugin-external-helpers

## Installation

```sh
npm install --save-dev @babel/plugin-external-helpers
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-external-helpers"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-external-helpers script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-external-helpers"]
});
```
