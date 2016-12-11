# babel-plugin-transform-es2015-modules-commonjs

> This plugin transforms ES2015 modules to [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1).

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = 42;
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-modules-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-es2015-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-modules-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-commonjs"]
});
```

## Options `spec`

By default, `babel` actually implements importing very loosely, by
supporting treating a commonjs export as if it was a namespace export.
The exported namespace is also not frozen and has an incorrect prototype.

The `spec` option, when set to `true`, tries to generate code that is as
close as possible to what is required by the ECMA262 spec without relying
on `Proxy`. The exports will be frozen, and imports will always be treated
like ES modules. All imported names will be checked, at import time, if
they exist in the exports of the imported module.

Importing a commonjs module (say, the standard `fs` module) will always
wrap it in an ES module that has a single `default` export. This means that
some imports that work in non-`spec` mode, like `import { readFile } from 'fs'`,
will result errors in `spec` mode.

Note that exports, under this mode, always require runtime support for
getters. It also is not possible to access or write to the commonjs
`exports` or `module` objects; attempts to access them will result in
TDZ errors at runtime.

### Input

```javascript
import 'module1';
import defaultImport from 'module2';
import * as namespace from 'module3';
import { pick } from 'module4';

defaultImport(namespace.foo, pick);

export { pick }
export default function () {}
```

### Output

```javascript
'use strict';

const exports = module.exports = Object.create ? Object.create(null, {
  __esModule: { value: true }
}) : { __esModule: true };
Object.defineProperties(exports, {
  default: {
    enumerable: true,
    get() { return _default; }
  },
  pick: {
    enumerable: true,
    get() { return _module4.pick; }
  }
});
let _default = {
  default: function () {}
}.default;
(Object.freeze || Object)(exports);

require('module1');

const _module2 = babelHelpers.specInteropImport(require('module2'));

babelHelpers.specImportCheck(_module2, [ 'default' ]);

const _module3 = babelHelpers.specInteropImport(require('module3'));

const _module4 = babelHelpers.specInteropImport(require('module4'));

babelHelpers.specImportCheck(_module4, [ 'pick' ]);
babelHelpers.specImportCheck(_module3, [ 'foo' ]);

_module2.default(_module3.foo, _module4.pick);
```

## Options `specImport`

This option enables only the half of `spec` mode that affects the imports, without
changing how exports are generated. This would allow the generation of code that
may still be compatible with engines that do not support getters.

Note that the require helpers do use `Object.keys` and `Object.defineProperty`, so
ES5 polyfills may still be required. When running on an old engine that does not support
`Object.defineProperty`, a polyfill to fake it like `es5-sham` is still required.

This option is **ignored** if `spec` is enabled. Enabling `spec` implies that this
option is also enabled.

### Input

```javascript
import { pick } from 'module'

export default pick()
```

### Output

```javascript
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _module = babelHelpers.specRequireInterop(require('module'));

babelHelpers.specImportCheck(_module, [ 'pick' ]);

exports.default = (0, _module.pick)();
```

## Options `loose`

As per the spec, `import` and `export` are only allowed to be used at the top
level. When in loose mode these are allowed to be used anywhere.

And by default, when using exports with babel a non-enumerable `__esModule` property
is exported.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In environments that don't support this you can enable loose mode on `es6.modules`
and instead of using `Object.defineProperty` an assignment will be used instead.

```javascript
var foo = exports.foo = 5;
exports.__esModule = true;
```

The `loose` option is **ignored** if used in combination with `spec`.

## Caveats

Star reexports (`export * from 'module'`) always run before other imports or
reexports, as this module's exports must be known before other modules execute.
That is, they behave as if there was an `import 'module'` that runs before any
of the other imports.

This is particularly hard to avoid in the `spec` / `specImport` mode, as the
exports must be frozen before importing other modules. Star reexports are the
only exception.
