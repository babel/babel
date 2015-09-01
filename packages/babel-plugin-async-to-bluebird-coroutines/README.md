# babel-plugin-async-to-bluebird-coroutines

Turn async functions into a Bluebird coroutine

## Installation

```sh
$ npm install babel-plugin-async-to-bluebird-coroutines
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["async-to-bluebird-coroutines"]
}
```

### Via CLI

```sh
$ babel --plugins async-to-bluebird-coroutines script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["async-to-bluebird-coroutines"]
});
```
