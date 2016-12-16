# babel-preset-stage-3

> Babel preset for stage 3 plugins.

## Install

```sh
npm install --save-dev babel-preset-stage-3
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-3"]
}
```

### Via CLI

```sh
babel script.js --presets stage-3
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-3"]
});
```
