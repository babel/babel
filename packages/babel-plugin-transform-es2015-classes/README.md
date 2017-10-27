# @babel/plugin-transform-es2015-classes

> Compile ES2015 classes to ES5

## Caveats

Built-in classes such as `Date`, `Array`, `DOM` etc cannot be properly subclassed
due to limitations in ES5 (for the [es2015-classes](http://babeljs.io/docs/plugins/transform-es2015-classes) plugin).
You can try to use [babel-plugin-transform-builtin-extend](https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend) based on `Object.setPrototypeOf` and `Reflect.construct`, but it also has some limitations.

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
npm install --save-dev @babel/plugin-transform-es2015-classes
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["@babel/transform-es2015-classes"]
}

// with options
{
  "plugins": [
    ["@babel/transform-es2015-classes", {
      "loose": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-es2015-classes script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-es2015-classes"]
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
