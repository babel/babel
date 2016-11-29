# babel-preset-stage-1

> Babel preset for stage 1 plugins.

## Install

```sh
npm install --save-dev babel-preset-stage-1
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-1"]
}
```

### Via CLI

```sh
babel script.js --presets stage-1
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-1"]
});
```
