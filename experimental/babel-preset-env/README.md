# [WIP 0.0.0] babel-preset-env

> Babel preset for all envs.

## Install

```sh
$ npm install --save-dev babel-preset-env
```

## Usage via `.babelrc`

### Options

* `loose` - Enable "loose" transformations for any plugins in this preset that allow them (Disabled by default).
* `modules` - Enable transformation of ES6 module syntax to another module type (Enabled by default to `"commonjs"`).
  * Can be `false` to not transform modules, or one of `["amd", "umd", "systemjs", "commonjs"]`

```
{
  "presets": [
    ["env", {
      "chrome": 49,
      "loose": true,
      "modules": false
    }]
  ]
}
```
