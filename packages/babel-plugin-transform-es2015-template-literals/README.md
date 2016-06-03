# babel-plugin-transform-es2015-template-literals

Compile ES2015 template literals to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-template-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-template-literals"]
}

// with options
{
  "plugins": [
    ["transform-es2015-template-literals", {
      "loose": true,
      "spec": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-template-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-template-literals"]
});
```
