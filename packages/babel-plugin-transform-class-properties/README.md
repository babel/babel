# babel-plugin-transform-class-properties

> This plugin transforms es2015 static class properties as well as properties declared with the es2016 property initializer syntax.

## Example

Below is a class with four class properties which will be transformed.

```js
  class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    }

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    }
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  console.log(myBork.prototype.boundFunction); // > undefined

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

```json
// without options
{
  "plugins": ["transform-class-properties"]
}

// with options
{
  "plugins": [
    ["transform-class-properties", { "spec": true }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-class-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-properties"]
});
```

## Options

### `spec`

`boolean`, defaults to `false`.

Class properties are compiled to use `Object.defineProperty`. Static fields are now defined even if they are not initialized.

## References

* [Proposal: ES Class Fields & Static Properties](https://github.com/jeffmo/es-class-static-properties-and-fields)
