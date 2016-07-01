# babel-plugin-transform-strict-mode

Add the `"use strict";` directive to the top of your files if it is not there
already.

> This plugin may be enabled via `babel-plugin-transform-es2015-modules-commonjs`.
> If you wish to disable it you can either turn `strict` off or pass
> `strictMode: false` as an option to the commonjs transform.

## Installation

```sh
$ npm install babel-plugin-transform-strict-mode
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-strict-mode"]
}

// with options
{
  "plugins": [
    ["transform-strict-mode", {
      "strict": true
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-strict-mode script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-strict-mode"]
});
```
