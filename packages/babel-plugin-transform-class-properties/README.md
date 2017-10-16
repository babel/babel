# babel-plugin-transform-class-properties

> This plugin transforms class properties

## Example

Below is a class with four class properties which will be transformed.

```js
  class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    };

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    };
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  console.log(myBork.__proto__.boundFunction); // > undefined

  //Bound functions are bound to the class instance.
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  //Static function exists on the class.
  console.log(Bork.staticFunction()); // > "babelIsCool"
```


## Installation

```sh
npm install --save-dev babel-plugin-transform-class-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-class-properties"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-class-properties", { "loose": true }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-class-properties script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-class-properties"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

When `true`, class properties are compiled to use an assignment expression instead of `Object.defineProperty`.

#### Example

```js
  class Bork {
    static a = 'foo';
    static b;

    x = 'bar';
    y;
  }
```

Without `{ "loose": true }`, the above code will compile to the following, using `Object.definePropery`:

```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  Object.defineProperty(this, "x", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'bar'
  });
  Object.defineProperty(this, "y", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0
  });
};

Object.defineProperty(Bork, "a", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'foo'
});
Object.defineProperty(Bork, "b", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0
});
```

However, with `{ "loose": true }`, it will compile using assignment expressions:

```js
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  this.x = 'bar';
  this.y = void 0;
};

Bork.a = 'foo';
Bork.b = void 0;
```

## References

* [Proposal: ES Class Fields & Static Properties](https://github.com/jeffmo/es-class-static-properties-and-fields)
