# babel-preset-react

> Babel preset for all React plugins.

## Install

```sh
$ npm install --save-dev babel-preset-react
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["react"]
}
```

### Via CLI

```sh
$ babel script.js --presets react 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["react"]
});
```
