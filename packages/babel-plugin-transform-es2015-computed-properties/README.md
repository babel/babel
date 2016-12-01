# babel-plugin-transform-es2015-computed-properties

> Compile ES2015 computed properties to ES5

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-computed-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-computed-properties"]
}

// with options
{
  "plugins": [
    ["transform-es2015-computed-properties", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-computed-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-computed-properties"]
});
```

## Options

* `loose` - Just like method assignment in classes, in loose mode, computed property names
use simple assignments instead of being defined. This is unlikely to be an issue
in production code.
