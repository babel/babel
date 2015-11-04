# babel-preset-stage-2

> Babel preset for stage 2 plugins.

## Install

```sh
$ npm install --save-dev babel-preset-stage-2
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-2"]
}
```

### Via CLI

```sh
$ babel script.js --presets stage-2
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-2"]
});
```
