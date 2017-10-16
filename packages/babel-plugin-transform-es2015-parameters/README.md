# babel-plugin-transform-es2015-parameters

> Compile ES2015 default and rest parameters to ES5

This plugin transforms ES2015 parameters to ES5, this includes:

- Destructuring parameters
- Default parameters
- Rest parameters

## Examples

**In**

```javascript
function test(x = "hello", { a, b }, ...args) {
  console.log(x, a, b, args);
}
```

**Out**

```javascript
function test() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hello";
  var _ref = arguments[1];
  var a = _ref.a,
      b = _ref.b;

  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  console.log(x, a, b, args);
}
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-parameters
```

## Caveats

Default parameters desugar into `let` declarations to retain proper semantics. If this is
not supported in your environment then you'll need the
[transform-block-scoping](http://babeljs.io/docs/plugins/transform-es2015-block-scoping) plugin.

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-parameters"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-parameters script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-es2015-parameters"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, parameters with default values will be counted into the arity of the function. This is not spec behavior where these parameters do not add to function arity.

The `loose` implementation is a more performant solution as JavaScript engines will fully optimize a function that doesn't reference `arguments`. Please do your own benchmarking and determine if this option is the right fit for your application.

```javascript
// Spec behavior
function bar1 (arg1 = 1) {}
bar1.length // 0

// Loose mode
function bar1 (arg1 = 1) {}
bar1.length // 1
```
