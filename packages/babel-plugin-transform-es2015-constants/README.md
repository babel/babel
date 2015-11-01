# babel-plugin-transform-es2015-constants

Compile ES2015 constants to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-constants
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-constants"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-constants script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-constants"]
});
```

## Note

This transform on its own will compile `const` to `let`. If you need it to compile down to `var` then you must also install and enable [`transform-es2015-block-scoping`](../babel-plugin-transform-es2015-block-scoping).
