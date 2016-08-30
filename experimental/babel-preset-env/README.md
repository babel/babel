# babel-preset-env

> Babel preset for all envs.

## Install

```sh
$ npm install --save-dev babel-preset-env
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["env"]
}
```

### Via CLI

```sh
$ babel script.js --presets env
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["env"]
});
```

## Options

* `loose` - Enable "loose" transformations for any plugins in this preset that allow them (Disabled by default).

```
{
  presets: [
    ["env", {
      chrome: 49
    }]
  ]
}
```
