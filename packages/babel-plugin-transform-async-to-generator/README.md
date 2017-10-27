# @babel/plugin-transform-async-to-generator

> Turn async functions into ES2015 generators

## Example

**In**

```javascript
async function foo() {
  await bar();
}
```

**Out**

```javascript
var _asyncToGenerator = function (fn) {
  ...
};
var foo = _asyncToGenerator(function* () {
  yield bar();
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-async-to-generator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-async-to-generator"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-async-to-generator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-async-to-generator"]
});
```

## References

* [Proposal: Async Functions for ECMAScript](https://github.com/tc39/ecmascript-asyncawait)
