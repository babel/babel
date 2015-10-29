# babel-plugin-transform-async-to-module-method

Turn async functions into a Bluebird coroutine

## Installation

```sh
$ npm install babel-plugin-transform-async-to-module-method
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-async-to-module-method"]
}
```

### Via CLI

```sh
$ babel --plugins transform-async-to-module-method script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-to-module-method"]
});
```
