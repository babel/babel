# Changelog

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
