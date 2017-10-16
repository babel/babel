# babel-plugin-transform-async-to-module-method

> Turn async functions into a Bluebird coroutine

## Example

**In**

```javascript
async function foo() {
  await bar();
}
```

**Out**

```javascript
var Bluebird = require("bluebird");

var foo = Bluebird.coroutine(function* () {
  yield bar();
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-async-to-module-method
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-async-to-module-method"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-async-to-module-method script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-async-to-module-method"]
});
```
