# @babel/preset-es2018

> Babel preset for all es2018 plugins.

## Install

```sh
npm install --save-dev @babel/preset-es2018
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-es2018"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-es2018
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-es2018"]
});
```
