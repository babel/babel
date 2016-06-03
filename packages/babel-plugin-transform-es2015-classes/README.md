# babel-plugin-transform-es2015-classes

Compile ES2015 classes to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-classes
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-classes"]
}

// with options
{
  "plugins": [
    ["transform-es2015-classes", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-classes script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-classes"]
});
```
