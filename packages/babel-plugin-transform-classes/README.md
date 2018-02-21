# @babel/plugin-transform-classes

> Compile ES2015 classes to ES5

## Caveats

When extending a native class (e.g., `class extends Array {}`), the super class
needs to be wrapped. This is needed to workaround two problems:
- Babel transpiles classes using `SuperClass.apply(/* ... */)`, but native
  classes aren't callable and thus throw in this case.
- Some built-in functions (like `Array`) always return a new object. Instead of
  returning it, Babel should treat it as the new `this`.

The wrapper works on IE11 and every other browser with `Object.setPrototypeOf` or `__proto__` as fallback.
There is **NO IE <= 10 support**. If you need IE <= 10 it's recommended that you don't extend natives.

## Examples

**In**

```javascript
class Test {
  constructor(name) {
    this.name = name;
  }

  logger () {
    console.log("Hello", this.name);
  }
}
```

**Out**

```javascript
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function () {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
  }

  Test.prototype.logger = function logger() {
    console.log("Hello", this.name);
  };

  return Test;
}();
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-classes
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["@babel/plugin-transform-classes"]
}

// with options
{
  "plugins": [
    ["@babel/plugin-transform-classes", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-classes script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-classes"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

#### Method enumerability

Please note that in loose mode class methods **are** enumerable. This is not in line
with the spec and you may run into issues.

#### Method assignment

Under loose mode, methods are defined on the class prototype with simple assignments
instead of being defined. This can result in the following not working:

```javascript
class Foo {
  set bar() {
    throw new Error("foo!");
  }
}

class Bar extends Foo {
  bar() {
    // will throw an error when this method is defined
  }
}
```

When `Bar.prototype.foo` is defined it triggers the setter on `Foo`. This is a
case that is very unlikely to appear in production code however it's something
to keep in mind.

### `assumePure`

`boolean`, defaults to `false` (`true` in `loose` mode).

Normally a check for purity is performed before annotating a transformed class
with `#__PURE__` comment, you can force those annotations on all classes or
have the plugin perform a check in `loose` mode.
