# babel-plugin-transform-es2015-for-of

Compile ES2015 for...of to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-for-of
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-for-of"]
}

// with options
{
  "plugins": [
    ["transform-es2015-for-of", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-for-of script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-for-of"]
});
```
