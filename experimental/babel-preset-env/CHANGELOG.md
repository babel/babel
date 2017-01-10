# Changelog

## v1.1.8 (2017-01-10)

### :bug: Bug Fix

- debug: Transformations before logs. ([#128](https://github.com/babel/babel-preset-env/pull/128)) (@yavorsky)

Makes sure that all transformations on `targets` (such as `exclude`/`include`) are run before logging out with the `debug` option. Fixes ([#127](https://github.com/babel/babel-preset-env/issues/127)))

### :house: Internal

- remove unnecessary extension. ([#131](https://github.com/babel/babel-preset-env/pull/131)) (@roman-yakobnyuk)
- Include yarn.lock and update CI. ([#124](https://github.com/babel/babel-preset-env/pull/124)) (@existentialism)

## v1.1.7 (2017-01-09)
 
Had a publishing issue in the previous release.

## v1.1.6 (2017-01-06)

### :bug: Bug Fix

- Explicitly resolve lowest browser version. ([#121](https://github.com/babel/babel-preset-env/pull/121)) (@brokenmass)

```js
{
  "targets": {
    "browsers": ["ios >= 6"] // was resolving to {ios: 10} rather than {ios: 6}
  }
}
```

## v1.1.5 (2017-01-04)

### :bug: Bug Fix

- Show error if target version is not a number. ([#107](https://github.com/babel/babel-preset-env/pull/107)) (@existentialism)

```js
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": "52", // will error since it's not a number,
        "chrome": 52 // correct!
      }
    }]
  ]
}
```

- Fix targets for the `debug` option. ([#109](https://github.com/babel/babel-preset-env/pull/109)) (@yavorsky)

Now it prints the transformed targets/environments rather than the browsers query.

```txt
Using targets:
{
  "chrome": 53,
  "ie": 10,
  "node": 6
}

Modules transform: false

Using plugins:
  transform-es2015-arrow-functions {"chrome":47,"node":6}
  transform-es2015-block-scoped-functions {"chrome":41,"ie":11,"node":4}

Using polyfills:
  es6.typed.uint8-clamped-array {"chrome":5,"node":0.12}
  es6.map {"chrome":51,"node":6.5}
```

## v1.1.4 (2016-12-16)

v1.1.2-v1.1.4

### :bug: Bug Fix

The new `exclude`/`include` options weren't working correctly for built-ins. ([#102](https://github.com/babel/babel-preset-env/pull/102)).

Also fixes an issue with debug option.

## v1.1.1 (2016-12-13)

### :bug: Bug Fix

Regression with the previous release due to using `Object.values` (ES2017). This wasn't caught because we are using babel-register to run tests and includes polyfills so it didn't fail on CI even though we have Node 0.10 as an env. Looking into fixing this to prevent future issues.

## v1.1.0 (2016-12-13)

### :rocket: New Feature

- Add `exclude` option, rename `whitelist` to `include` ([#89](https://github.com/babel/babel-preset-env/pull/89)) (@hzoo)

Example:

```js
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      },
      "include": ["transform-es2015-arrow-functions"],
      "exclude": [
        "transform-regenerator",
        "transform-async-to-generator",
        "map"
      ],
      "useBuiltIns": true
    }]
  ]
}
```

`"exclude": ["transform-regenerator"]` doesn't transform generators and removes `regeneratorRuntime` from being imported.

`"exclude": ["transform-async-to-generator"]` doesn't use the built-in async-to-gen transform so you can use something like [fast-async](https://github.com/MatAtBread/fast-async).

`"exclude": ["map"]` doesn't include the `Map` polyfill if you know you aren't using it in your code (w/ `useBuiltIns`). (We will figure out a way to automatically do this [#84](https://github.com/babel/babel-preset-env/issues/84)).

If you pass a wrong plugin it will error: valid options for `include/exclude` are in [/data/plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js) and [/data/built-in-features.js](https://github.com/babel/babel-preset-env/blob/master/data/built-in-features.js) (without the `es6.`)

### :house: Internal

- Optimize result filtration. ([#77](https://github.com/babel/babel-preset-env/pull/77)) (@yavorsky)
- Update eslint config to align with other babel projects ([#79](https://github.com/babel/babel-preset-env/pull/79)) (@baer)
- Update pathnames to avoid uppercase ([#80](https://github.com/babel/babel-preset-env/pull/80)) (@baer)
- Refactor build data for clarity/consistency ([#81](https://github.com/babel/babel-preset-env/pull/81)) (@baer)
- Update linting rules to cover all js ([#82](https://github.com/babel/babel-preset-env/pull/82)) (@baer)
- Cleanup lib before rebuilding ([#87](https://github.com/babel/babel-preset-env/pull/87)) (@baer)
- Move linting dependency to be dev only ([#88](https://github.com/babel/babel-preset-env/pull/88)) (@baer)

### :memo: Documentation

- Fix typo ([#78](https://github.com/babel/babel-preset-env/pull/78)) (@rohmanhm)
- Fix PR link in changelog. ([#75](https://github.com/babel/babel-preset-env/pull/75)) (@nhajidin)

## v1.0.2 (2016-12-10)

### :bug: Bug Fix

* Fix issue with Object.getOwnPropertySymbols ([#71](https://github.com/babel/babel-preset-env/pull/71)) ([@existentialism](https://github.com/existentialism))

Was requiring the wrong module kinda of like in v1.0.1:

https://github.com/zloirock/core-js#ecmascript-6-symbol

```diff
-import "core-js/modules/es6.object.get-own-property-symbols";
```

The test is just a part of `Symbol`.

## v1.0.1 (2016-12-10)

### :bug: Bug Fix

* Fix regenerator import ([#68](https://github.com/babel/babel-preset-env/pull/68)) ([@hzoo](https://github.com/hzoo))

We were outputting an invalid path for `regenerator`!

```diff
+import "regenerator-runtime/runtime";
-import "core-js/modules/regenerator-runtime/runtime"-
```

## v1.0.0 (2016-12-09)

### :rocket: New Feature

* Add `useBuiltIns` option ([#56](https://github.com/babel/babel-preset-env/pull/56)) ([@hzoo](https://github.com/hzoo)), ([@yavorsky](https://github.com/yavorsky)), ([@existentialism](https://github.com/existentialism))

A way to apply `babel-preset-env` for polyfills (via `"babel-polyfill"``).

> This option will apply a new Babel plugin that replaces `require("babel-polyfill")` with the individual requires for `babel-polyfill` based on the target environments.

Install

```
npm install babel-polyfill --save
```

In

```js
import "babel-polyfill"; // create an entry js file that contains this
// or 
import "core-js";
```

Out (different based on environment)

```js
// chrome 55
import "core-js/modules/es7.string.pad-start"; // haha left_pad
import "core-js/modules/es7.string.pad-end";
import "core-js/modules/web.timers";
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
```

`.babelrc` Usage

```js
{
  "presets": [
    ["env", {
      "targets": {
        "electron": 1.4
      },
      "modules": false, // webpack 2
      "useBuiltIns": true // new option
    }]
  ]
}
```

> Also looking to make an easier integration point via Webpack with this method. Please reach out if you have ideas!

---

* Support [Electron](http://electron.atom.io/) ([#55](https://github.com/babel/babel-preset-env/pull/55)) ([@paulcbetts](https://github.com/paulcbetts))

Electron is also an environment, so [Paul went ahead](https://twitter.com/paulcbetts/status/804507070103851008) and added support for this!

`.babelrc` Usage

```js
{
  "presets": [ ["env", {"targets": { "electron": 1.4 }}]]
}
```

> Currently we are manually updating the data in [/data/electron-to-chromium.js](https://github.com/babel/babel-preset-env/blob/master/data/electron-to-chromium.js), but [@kevinsawicki](https://github.com/kevinsawicki) says we could generate the data from [atom-shell/dist/index.json](https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist/index.json) as well! (Someone should make a PR :smile:)



## v0.0.9 (2016-11-24)

### :rocket: New Feature

* Support Opera ([#48](https://github.com/babel/babel-preset-env/pull/48)) (Henry Zhu)

Was as simple as modifying the chrome version and subtracting 13! (so chrome 54 = opera 41)

```js
{
  "presets": [
    ["env", {
      "targets": {
        "opera": 41
      }
    }]
  ]
}
```

## v0.0.8 (2016-11-16)

### :nail_care: Polish

* Only print the debug info once ([#46](https://github.com/babel/babel-preset-env/pull/46) (Henry Zhu)

When using the `debug` option it was printing the data for each file processed rather than once.

```js
{
  "presets": [
    ["env", {
      "debug": true
    }]
  ]
}
```

## v0.0.7 (2016-11-02)

### :rocket: New Feature

* hardcode a current node version option ([#35](https://github.com/babel/babel-preset-env/pull/35)) (Henry Zhu)

```js
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current" // parseFloat(process.versions.node)
      }
    }]
  ]
}
```

* add 'whitelist' option ([#31](https://github.com/babel/babel-preset-env/pull/31)) (Henry Zhu)

```js
 {
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      },
      "whitelist": ["transform-es2015-arrow-functions"]
    }]
  ]
}
```

* Add more aliases (Henry Zhu)
* Update plugin data: firefox 52 supports async/await! ([#29](https://github.com/babel/babel-preset-env/pull/29)) (Henry Zhu)

### :bug: Bug Fixes

* Use compat-table equals option ([#36](https://github.com/babel/babel-preset-env/pull/36)) (Henry Zhu)

Compute and use `compat-table` equivalents

```js
{
  "safari6": "phantom",
  "chrome44": "iojs",
  "chrome50": "node64",
  "chrome51": "node65",
  "chrome54": "node7",
  "chrome30": "android44",
  "chrome37": "android50",
  "chrome39": "android51",
  "safari7": "ios7",
  "safari71_8": "ios8",
  "safari9": "ios9",
  "safari10": "ios10",
  "chrome50": "node6"
}
```

* Change default behavior to act the same as babel-preset-latest ([#33](https://github.com/babel/babel-preset-env/pull/33)) (Henry Zhu)

```js
{ "presets": ["env"] } // should act the same as babel-preset-latest
```

## Internal

* Add fixture helper for tests ([#28](https://github.com/babel/babel-preset-env/pull/28)) (Henry Zhu)
