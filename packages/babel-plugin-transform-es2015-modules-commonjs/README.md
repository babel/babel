# babel-plugin-transform-es2015-modules-commonjs

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-commonjs"]
});
```
