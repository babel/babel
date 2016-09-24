# babel-preset-latest

> Babel preset including es2015, es2016, es2017.

## Install

```sh
$ npm install --save-dev babel-preset-latest
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["latest"]
}
```

### Via CLI

```sh
$ babel script.js --presets latest
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["latest"]
});
```
