# @babel/plugin-transform-modules-commonjs

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
npm install --save-dev @babel/plugin-transform-modules-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["@babel/plugin-transform-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["@babel/plugin-transform-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-modules-commonjs script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-modules-commonjs"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

By default, when using exports with babel a non-enumerable `__esModule` property
is exported.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In environments that don't support this you can enable loose mode on `@babel/plugin-transform-modules-commonjs`
and instead of using `Object.defineProperty` an assignment will be used instead.

```javascript
var foo = exports.foo = 5;
exports.__esModule = true;
```

### `strict`

`boolean`, defaults to `false`

By default, when using exports with babel a non-enumerable `__esModule` property
is exported. In some cases this property is used to determine if the import _is_ the
default export or if it _contains_ the default export.

```javascript
var foo = exports.foo = 5;

Object.defineProperty(exports, "__esModule", {
  value: true
});
```

In order to prevent the `__esModule` property from being exported, you can set
the `strict` option to `true`.

### `noInterop`

`boolean`, defaults to `false`

By default, when using exports with babel a non-enumerable `__esModule` property
is exported. This property is then used to determine if the import _is_ the default
export or if it _contains_ the default export.

```javascript
"use strict";

var _foo = _interopRequireDefault(require("foo"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
```

In cases where the auto-unwrapping of `default` is not needed, you can set the
`noInterop` option to `true` to avoid the usage of the `interopRequireDefault`
helper (shown in inline form above).

### `lazy`

`boolean`, `Array<string>`, or `(string) => boolean`, defaults to `false`

Changes Babel's compiled `import` statements to be lazily evaluated when their
imported bindings are used for the first time.

This can improve initial load time of your module because evaluating
dependencies up front is sometimes entirely un-necessary. This is especially
the case when implementing a library module.

The value of `lazy` has a few possible effects:

* `false` - No lazy initialization of any imported module.
* `true` - Do not lazy-initialize local `./foo` imports, but lazy-init `foo` dependencies.

  Local paths are much more likely to have circular dependencies, which may break if loaded lazily,
  so they are not lazy by default, whereas dependencies between independent modules are rarely cyclical.

* `Array<string>` - Lazy-initialize all imports with source matching one of the given strings.
* `(string) => boolean` - Pass a callback that will be called to decide if a given source string should be lazy-loaded.

The two cases where imports can never be lazy are:

* `import "foo";`

  Side-effect imports are automatically non-lazy since their very existence means
  that there is no binding to later kick off initialization.

* `export * from "foo"`

  Re-exporting all names requires up-front execution because otherwise there is no
  way to know what names need to be exported.
