# babel-preset-es2016

> Babel preset for all es2016 plugins.

## Install

```sh
$ npm install --save-dev babel-preset-es2016
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2016"]
}
```

### Via CLI

```sh
$ babel script.js --presets es2016
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2016"]
});
```
