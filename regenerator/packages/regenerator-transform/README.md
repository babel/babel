# babel-plugin-transform-regenerator

Transform async/generator functions with [regenerator](https://github.com/facebook/regenerator)

## Installation

```sh
$ npm install babel-plugin-transform-regenerator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-regenerator"]
}
// with options
{
  "plugins": [
    ["transform-regenerator", {
        asyncGenerators: false, // true by default
        generators: false, // true by default
        async: false // true by default
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-regenerator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-regenerator"]
});
```
