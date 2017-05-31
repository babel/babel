# babel-plugin-transform-es2015-spread

> Compile ES2015 spread to ES5

## Example

**In**

```js
var a = ['a', 'b', 'c'];
var b = [...a, 'foo'];
```

**Out**

```js
var a = [ 'a', 'b', 'c' ];
var b = [].concat(a, [ 'foo' ]);
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-es2015-spread"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-spread", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-spread"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, **all** iterables are assumed to be arrays.
