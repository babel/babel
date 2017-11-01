# @babel/preset-es2017

> Babel preset for all es2017 plugins.

## Install

```sh
npm install --save-dev @babel/preset-es2017
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/es2017"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/es2017
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/es2017"]
});
```
