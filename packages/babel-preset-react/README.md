# babel-preset-react

> Babel preset for all react plugins.

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
$ babel script.js --preset react 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["react"]
});
```
