# babel-plugin-transform-async-to-bluebird-coroutines

Turn async functions into a Bluebird coroutine

## Installation

```sh
$ npm install babel-plugin-transform-async-to-bluebird-coroutines
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-async-to-bluebird-coroutines"]
}
```

### Via CLI

```sh
$ babel --plugins transform-async-to-bluebird-coroutines script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-to-bluebird-coroutines"]
});
```
