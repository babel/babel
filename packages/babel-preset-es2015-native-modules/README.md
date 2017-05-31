# babel-preset-es2015-native-modules

> Babel preset for all es2015 plugins MINUS ONE __babel-plugin-transform-es2015-modules-commonjs__.

## Install

```sh
$ npm install --save-dev babel-preset-es2015-native-modules
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2015-native-modules"]
}
```

### Via CLI

```sh
$ babel script.js --presets es2015-native-modules 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2015-native-modules"]
});
```
