# babel-plugin-transform-es2015-modules-umd

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-umd
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-modules-umd"]
}
```

You can also override the names of particular libraries when this module is
running in the browser.  For example the `es6-promise` library exposes itself
as `global.Promise` rather than `global.es6Promise`. This can be accomidated by:

```
{
  "plugins": [
    ["transform-es2015-modules-umd", {
      "globals": {
        "es6-promise": "Promise"
      }
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-umd script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-umd"]
});
```
