# babel-plugin-transform-object-rest-spread

> This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.

## Example

```js
// Rest properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }

// Spread properties
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```


## Installation

```sh
npm install --save-dev babel-plugin-transform-object-rest-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-object-rest-spread"]
}
```

## Options

This plugin will use babel's `extends` helper, which will polyfill `Object.assign` by default.

* `useBuiltIns` - Do not use Babel's helper's and just transform to use the built-in method (Disabled by default).

```js
{
  "plugins": [
    ["transform-object-rest-spread", { "useBuiltIns": true }]
  ]
}

// source
z = { x, ...y };
// compiled
z = Object.assign({ x }, y);
```

### Via CLI

```sh
babel --plugins transform-object-rest-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-rest-spread"]
});
```

## References

* [Proposal: Object Rest/Spread Properties for ECMAScript](https://github.com/sebmarkbage/ecmascript-rest-spread)
* [Spec](http://sebmarkbage.github.io/ecmascript-rest-spread)
