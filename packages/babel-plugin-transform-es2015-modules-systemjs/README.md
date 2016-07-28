# babel-plugin-transform-es2015-modules-systemjs

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-systemjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```javascript
// without options
{
  "plugins": ["transform-es2015-modules-systemjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-systemjs", {
      // outputs SystemJS.register(...)
      "systemGlobal": "SystemJS"
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-systemjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-systemjs"]
});
```
