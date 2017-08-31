# babel-plugin-transform-runtime

> Externalise references to helpers and built-ins, automatically polyfilling your code without polluting globals. (This plugin is recommended in a library/tool)

NOTE: Instance methods such as `"foobar".includes("foo")` will not work since that would require modification of existing built-ins (Use [`babel-polyfill`](http://babeljs.io/docs/usage/polyfill) for that).

## Why?

Babel uses very small helpers for common functions such as `_extend`. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.

This is where the `transform-runtime` plugin comes in: all of the helpers will reference the module `babel-runtime` to avoid duplication across your compiled output. The runtime will be compiled into your build.

Another purpose of this transformer is to create a sandboxed environment for your code. If you use [babel-polyfill](http://babeljs.io/docs/usage/polyfill/) and the built-ins it provides such as `Promise`, `Set` and `Map`, those will pollute the global scope. While this might be ok for an app or a command line tool, it becomes a problem if your code is a library which you intend to publish for others to use or if you can't exactly control the environment in which your code will run.

The transformer will alias these built-ins to `core-js` so you can use them seamlessly without having to require the polyfill.

See the [technical details](#technical-details) section for more information on how this works and the types of transformations that occur.

## Installation

**NOTE - Production vs. development dependencies**

In most cases, you should install `babel-plugin-transform-runtime` as a development dependency (with `--save-dev`).

```sh
npm install --save-dev babel-plugin-transform-runtime
```

and `babel-runtime` as a production dependency (with `--save`).

```sh
npm install --save babel-runtime
```

The transformation plugin is typically used only in development, but the runtime itself will be depended on by your deployed/published code. See the examples below for more details.

## Usage

### Via `.babelrc` (Recommended)

Add the following line to your `.babelrc` file:

Without options:

```json
{
  "plugins": ["transform-runtime"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-runtime script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-runtime"]
});
```

## Options

### `helpers`

`boolean`, defaults to `true`.

Toggles whether or not inlined Babel helpers (`classCallCheck`, `extends`, etc.) are replaced with calls to `moduleName`.

For more information, see [Helper aliasing](#helper-aliasing).

### `polyfill`

`boolean`, defaults to `true`.

Toggles whether or not new built-ins (`Promise`, `Set`, `Map`, etc.) are transformed to use a non-global polluting polyfill.

For more information, see [`core-js` aliasing](#core-js-aliasing).

### `regenerator`

`boolean`, defaults to `true`.

Toggles whether or not generator functions are transformed to use a regenerator runtime that does not pollute the global scope.

For more information, see [Regenerator aliasing](#regenerator-aliasing).

### `moduleName`

`string`, defaults to `"babel-runtime"`.

Sets the name/path of the module used when importing helpers.

Example:

```json
{
  "moduleName": "flavortown/runtime"
}
```

```js
import extends from 'flavortown/runtime/helpers/extends';
```

### `useBuiltIns`

`boolean`, defaults to `false`.

When enabled, the transform will use helpers that do not use _any_ polyfills
from `core-js`.

For example, here is the `instance` helper with `useBuiltIns` disabled:

```js
exports.__esModule = true;

var _hasInstance = require("../core-js/symbol/has-instance");

var _hasInstance2 = _interopRequireDefault(_hasInstance);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (left, right) {
  if (right != null && typeof _symbol2.default !== "undefined" && right[_hasInstance2.default]) {
    return right[_hasInstance2.default](left);
  } else {
    return left instanceof right;
  }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

And, with it enabled:

```js
exports.__esModule = true;

exports.default = function (left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};
```

### `useESModules`

`boolean`, defaults to `false`.

When enabled, the transform will use helpers that do not get run through
`transform-es2015-modules-commonjs`. This allows for smaller builds in module
systems like webpack, since it doesn't need to preserve commonjs semantics.

For example, here is the `classCallCheck` helper with `useESModules` disabled:

```js
exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
```

And, with it enabled:

```js
export default function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
```

## Technical details

The `runtime` transformer plugin does three things:

* Automatically requires `babel-runtime/regenerator` when you use generators/async functions.
* Automatically requires `babel-runtime/core-js` and maps ES6 static methods and built-ins.
* Removes the inline Babel helpers and uses the module `babel-runtime/helpers` instead.

What does this actually mean though? Basically, you can use built-ins such as `Promise`, `Set`, `Symbol`, etc., as well use all the Babel features that require a polyfill seamlessly, without global pollution, making it extremely suitable for libraries.

Make sure you include `babel-runtime` as a dependency.

### Regenerator aliasing

Whenever you use a generator function or async function:

```javascript
function* foo() {

}
```

the following is generated:

```javascript
"use strict";

var _marked = [foo].map(regeneratorRuntime.mark);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
```

This isn't ideal since it relies on the regenerator runtime being included, which
pollutes the global scope.

With the `runtime` transformer, however, it is compiled to:

```javascript
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [foo].map(_regenerator2.default.mark);

function foo() {
  return _regenerator2.default.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
```

This means that you can use the regenerator runtime without polluting your current environment.

### `core-js` aliasing

Sometimes you may want to use new built-ins such as `Map`, `Set`, `Promise` etc. Your only way
to use these is usually to include a globally polluting polyfill.

What the `runtime` transformer does is transform the following:

```javascript
var sym = Symbol();

var promise = new Promise;

console.log(arr[Symbol.iterator]());
```

into the following:

```javascript
"use strict";

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sym = (0, _symbol2.default)();

var promise = new _promise2.default();

console.log((0, _getIterator3.default)(arr));
```

This means is that you can seamlessly use these native built-ins and static methods
without worrying about where they come from.

**NOTE:** Instance methods such as `"foobar".includes("foo")` will **not** work.

### Helper aliasing

Usually Babel will place helpers at the top of your file to do common tasks to avoid
duplicating the code around in the current file. Sometimes these helpers can get a
little bulky and add unnecessary duplication across files. The `runtime`
transformer replaces all the helper calls to a module.

That means that the following code:

```javascript
class Person {
}
```

usually turns into:

```javascript
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person() {
  _classCallCheck(this, Person);
};
```

the `runtime` transformer however turns this into:

```javascript
"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = function Person() {
  (0, _classCallCheck3.default)(this, Person);
};
```
