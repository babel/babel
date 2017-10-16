# babel-preset-es2017

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
  "presets": ["es2017"]
}
```

### Via CLI

```sh
babel script.js --presets es2017
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["es2017"]
});
```
