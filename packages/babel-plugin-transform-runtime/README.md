# babel-plugin-transform-runtime

Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals

## Installation

```sh
$ npm install babel-plugin-transform-runtime
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-runtime"]
}

// with options
{
  "plugins": [
    ["transform-runtime", {
      "polyfill": false,
      "regenerator": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-runtime script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-runtime"]
});
```
