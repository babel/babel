# [WIP 0.0.0] babel-preset-env

> Babel preset for all envs.

## Install

```sh
$ npm install --save-dev babel-preset-env
```

## Usage via `.babelrc`

### Options

* `targets` - an object of browsers/environment versions to support. The data for this is currently at: https://github.com/babel/babel-preset-env/blob/master/src/plugins.js (It would be nice to move this to use a data source like kangax.github.io/compat-table).

> We would like help to make the data is correct! This just means usage/testing!

* `loose` - Enable "loose" transformations for any plugins in this preset that allow them (Disabled by default).
* `modules` - Enable transformation of ES6 module syntax to another module type (Enabled by default to `"commonjs"`).
  * Can be `false` to not transform modules, or one of `["amd", "umd", "systemjs", "commonjs"]`

```
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      },
      "loose": true,
      "modules": false
    }]
  ]
}
```

### Example

```js
// src
export class A {}
```

```js
// default is to run all transforms
{
  "presets": [
    ["env", {}]
  ]
}

// ...

var A = exports.A = function A() {
  _classCallCheck(this, A);
};
```

```js
// target chrome 52
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      }
    }]
  ]
}

// ...

class A {}
exports.A = A;
```

```js
// target chrome 52 with webpack 2/rollup
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      },
      "modules": false
    }]
  ]
}

// ...

export class A {}
```
