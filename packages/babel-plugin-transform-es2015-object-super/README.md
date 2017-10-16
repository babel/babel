# babel-plugin-transform-es2015-object-super

> Compile ES2015 object super to ES5

## Examples

**In**

```javascript
let obj = {
  say () {
    return "Hello"
  }
}

let obj2 = {
  say () {
    return super.say() + "World!"
  }
}
```

**Out**

```javascript
var _obj;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var obj = {
  say: function say() {
    return "Hello";
  }
};

var obj2 = _obj = {
  say: function say() {
    return _get(_obj.__proto__ || Object.getPrototypeOf(_obj), "say", this).call(this) + "World!";
  }
};
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-object-super
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-object-super"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-object-super script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-es2015-object-super"]
});
```
