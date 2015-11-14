# babel-plugin-check-es2015-constants

Validate ES2015 constants

## Installation

```sh
$ npm install babel-plugin-check-es2015-constants
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["check-es2015-constants"]
}
```

### Via CLI

```sh
$ babel --plugins check-es2015-constants script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["check-es2015-constants"]
});
```

## Note

This check will only validate consts. If you need it to compile down to `var` then you must also install and enable [`transform-es2015-block-scoping`](../babel-plugin-transform-es2015-block-scoping).
