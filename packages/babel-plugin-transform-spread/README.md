# @babel/plugin-transform-spread

> Compile ES2015 spread to ES5

## Example

**In**

```js
var a = ['a', 'b', 'c'];

var b = [...a, 'foo'];

var c = foo(...a);
```

**Out**

```js
var a = ['a', 'b', 'c'];

var b = a.concat(['foo']);

var c = foo.apply(void 0, a);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-spread"]
}
```

With options:

```json
{
  "plugins": [
    ["@babel/plugin-transform-spread", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-spread script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-spread"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, **all** iterables are assumed to be arrays.

## References

* [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
