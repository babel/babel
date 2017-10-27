# @babel/plugin-transform-throw-expressions

This plugin transforms Throw Expressions into an IIFE.

## Example

```js
function test(param = throw new Error('required!')) {
  const test = param === true || throw new Error('Falsey!');
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-throw-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-throw-expressions"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-throw-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-throw-expressions"]
});
```

## References

* [Proposal: Numeric Separators](https://github.com/tc39/proposal-throw-expressions)
