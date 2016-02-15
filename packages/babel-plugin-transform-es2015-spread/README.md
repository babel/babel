# babel-plugin-transform-es2015-spread

Compile ES2015 spread to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-spread"]
}

// with options
{
  "plugins": [
    ["transform-es2015-spread", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-spread"]
});
```
