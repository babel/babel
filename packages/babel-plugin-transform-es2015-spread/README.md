# babel-plugin-transform-es2015-spread

> Compile ES2015 spread to ES5

## Example

**In**

```js
var a = ['a', 'b', 'c'];
var b = [...a, 'foo'];

var c = { foo: 'bar', baz: 42 };
var d = {...c, a: 2};
```

**Out**

```js
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

var a = [ 'a', 'b', 'c' ];
var b = [].concat(a, [ 'foo' ]);

var c = { foo: 'bar', baz: 42 };
var d = _extends({}, c, { a: 2 });
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
