# @babel/plugin-transform-es2015-for-of

> Compile ES2015 for...of to ES5

## Example

**In**

```js
for (var i of foo) {}
```

**Out**

```js
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = foo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-es2015-for-of
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```js
{
  "plugins": ["transform-es2015-for-of"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-for-of", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-for-of script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-es2015-for-of"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`

In loose mode, arrays are put in a fast path, thus heavily increasing performance.
All other iterables will continue to work fine.

#### Example

**In**

```js
for (var i of foo) {}
```

**Out**

```js
for (var _iterator = foo, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  var _ref;

  if (_isArray) {
    if (_i >= _iterator.length) break;
    _ref = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    _ref = _i.value;
  }

  var i = _ref;
}
```

#### Abrupt completions

In loose mode an iterator's `return` method will not be called on abrupt completions caused by thrown errors.

Please see [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and
[babel/babel#838](https://github.com/babel/babel/issues/838) for more information.

### Optimization

If a basic array is used, Babel will compile the for-of loop down to a regular for loop.

**In**

```js
for (let a of [1,2,3]) {}
```

**Out**

```js
var _arr = [1, 2, 3];
for (var _i = 0; _i < _arr.length; _i++) {
  var a = _arr[_i];
}
```
