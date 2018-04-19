# @babel/plugin-transform-destructuring

> Compile ES2015 destructuring to ES5

## Examples

**In**

```javascript
let arr = [1,2,3];
let {x, y, z} = arr;
```

**Out**

```javascript
var arr = [1, 2, 3];
var x = arr.x,
    y = arr.y,
    z = arr.z;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-destructuring
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-destructuring"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-destructuring script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-destructuring"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enabling this option will assume that what you want to destructure is an array and won't use `Array.from` on other iterables.

### `useBuiltIns`

`boolean`, defaults to `false`.

Enabling this option will use `Object.assign` directly instead of the Babel's `extends` helper. 

##### Example

**.babelrc**

```json
{
  "plugins": [
    ["@babel/plugin-transform-destructuring", { "useBuiltIns": true }]
  ]
}
```

**In**

```js
var { ...x } = z;
```

**Out**

```js
var _z = z,
    x = Object.assign({}, _z);
```
