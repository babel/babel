# babel-plugin-transform-es2015-arrow-functions

> Compile ES2015 arrow functions to ES5

## Example

**In**

```javascript
var a = () => {};
var a = (b) => b;

const double = [1,2,3].map((num) => num * 2);
console.log(double); // [2,4,6]

var bob = {
  _name: "Bob",
  _friends: ["Sally", "Tom"],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};
console.log(bob.printFriends());
```

**Out**

```javascript
var a = function a() {};
var a = function a(b) {
  return b;
};

var double = [1, 2, 3].map(function (num) {
  return num * 2;
});
console.log(double); // [2,4,6]

var bob = {
  _name: "Bob",
  _friends: ["Sally", "Tom"],
  printFriends: function printFriends() {
    var _this = this;

    this._friends.forEach(function (f) {
      return console.log(_this._name + " knows " + f);
    });
  }
};
console.log(bob.printFriends());
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-arrow-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-arrow-functions", { "spec": true }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-arrow-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-arrow-functions"]
});
```

## Options

### `spec`

`boolean`, defaults to `false`.

This option wraps the generated function in `.bind(this)` and keeps uses of `this` inside the function as-is, instead of using a renamed `this`. It also adds a runtime check to ensure the functions are not instantiated.
