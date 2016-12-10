# Changelog

## v1.0.1 (2016-12-10)

### :bug: Bug Fix

* Fix regenerator import (#68)  ([@hzoo](https://github.com/hzoo))

We were outputting an invalid path for `regenerator`!

```diff
+import "regenerator-runtime/runtime";
-import "core-js/modules/regenerator-runtime/runtime"-
```

## v1.0.0 (2016-12-09)

### :rocket: New Feature

* Add `useBuiltIns` option ([#56](https://github.com/babel/babel-preset-env/pull/55)) ([@hzoo](https://github.com/hzoo)), ([@yavorsky](https://github.com/yavorsky)), ([@existentialism](https://github.com/existentialism))

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

> Currently we are manually updating the data in [/data/electronToChromium.js](https://github.com/babel/babel-preset-env/blob/master/data/electronToChromium.js), but [@kevinsawicki](https://github.com/kevinsawicki) says we could generate the data from [atom-shell/dist/index.json](https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist/index.json) as well! (Someone should make a PR :smile:)



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
