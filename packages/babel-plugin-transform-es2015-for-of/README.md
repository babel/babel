# babel-plugin-transform-es2015-for-of

> Compile ES2015 for...of to ES5

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-for-of
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-for-of"]
}

// with options
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
require("babel-core").transform("code", {
  plugins: ["transform-es2015-for-of"]
});
```

## Options `loose`

#### Abrupt completions

In loose mode an iterators `return` method will not be called on abrupt completions caused by thrown errors.

Please see [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and
[babel/babel#838](https://github.com/babel/babel/issues/838) for more information.

#### Arrays

Under loose mode the `forOf` transformer will output more verbose iteration code.

For example the following:

```javascript
for (var i of foo) {}
```

is normally output as:

```javascript
for (var _iterator = foo[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  var i = _step.value;
}
```

Under loose mode however it's output as:

```javascript
for (var _iterator = foo, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
  var i;
  if (_isArray) {
    if (_i >= _iterator.length) break;
    i = _iterator[_i++];
  } else {
    _i = _iterator.next();
    if (_i.done) break;
    i = _i.value;
  }
}
```

The result is that arrays are put in a fast path, heavily increasing performance.
All other iterables will continue to work fine but array iteration will be
significantly faster.

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
