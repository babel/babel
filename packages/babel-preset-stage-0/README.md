# babel-preset-stage-0

> Babel preset for stage 0 plugins.

## Install

```sh
$ npm install --save-dev babel-preset-stage-0
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-0"]
}
```

### Via CLI

```sh
$ babel script.js --presets stage-0
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-0"]
});
```
