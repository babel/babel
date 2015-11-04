# babel-preset-es2015

> Babel preset for all es2015 plugins.

## Install

```sh
$ npm install --save-dev babel-preset-es2015
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2015"]
}
```

### Via CLI

```sh
$ babel script.js --presets es2015 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2015"]
});
```
