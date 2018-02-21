# @babel/plugin-transform-object-rest-spread

> This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.

## Example

### Rest Properties

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

### Spread Properties

```js
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-object-rest-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-object-rest-spread"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-object-rest-spread script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-object-rest-spread"]
});
```

## Options

By default, this plugin will produce spec compliant code by using Babel's `objectSpread` helper.

### `loose`

`boolean`, defaults to `false`.

Enabling this option will use Babel's `extends` helper, which is basically the same as `Object.assign` (see `useBuiltIns` below to use it directly).

:warning: Please keep in mind that even if they're almost equivalent, there's an important difference between spread and `Object.assign`: **spread _defines_ new properties, while `Object.assign()` _sets_ them**, so using this mode might produce unexpected results in some cases.

For detailed information please check out [Spread VS. Object.assign](http://2ality.com/2016/10/rest-spread-properties.html#spreading-objects-versus-objectassign) and [Assigning VS. defining properties](http://exploringjs.com/es6/ch_oop-besides-classes.html#sec_assigning-vs-defining-properties).


### `useBuiltIns`

`boolean`, defaults to `false`.

Enabling this option will use `Object.assign` directly instead of the Babel's `extends` helper. Keep in mind that this flag only applies when `loose: true`.


##### Example

**.babelrc**

```json
{
  "plugins": [
    ["@babel/plugin-transform-object-rest-spread", { "loose": true, "useBuiltIns": true }]
  ]
}
```

**In**

```js
z = { x, ...y };
```

**Out**

```js
z = Object.assign({ x }, y);
```

## References

* [Proposal: Object Rest/Spread Properties for ECMAScript](https://github.com/sebmarkbage/ecmascript-rest-spread)
* [Spec](http://sebmarkbage.github.io/ecmascript-rest-spread)
* [Spread VS. Object.assign](http://2ality.com/2016/10/rest-spread-properties.html#spreading-objects-versus-objectassign)
* [Assigning VS. defining properties](http://exploringjs.com/es6/ch_oop-besides-classes.html#sec_assigning-vs-defining-properties)
