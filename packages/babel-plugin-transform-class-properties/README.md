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

[Try in REPL](http://babeljs.io/repl/#?babili=false&evaluate=false&lineWrap=false&presets=es2016%2Clatest%2Cstage-2&code=%20%20class%20Bork%20%7B%0A%20%20%20%20%2F%2FProperty%20initilizer%20syntax%0A%20%20%20%20instanceProperty%20%3D%20%22bork%22%3B%0A%20%20%20%20boundFunction%20%3D%20()%20%3D%3E%20%7B%0A%20%20%20%20%20%20return%20this.instanceProperty%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20%2F%2FStatic%20class%20properties%0A%20%20%20%20static%20staticProperty%20%3D%20%22babeliscool%22%3B%0A%20%20%20%20static%20staticFunction%20%3D%20function()%20%7B%0A%20%20%20%20%20%20return%20Bork.staticProperty%3B%0A%20%20%20%20%7D%0A%20%20%7D%0A%0A%20%20let%20myBork%20%3D%20new%20Bork%3B%0A%0A%20%20%2F%2FProperty%20initializers%20are%20not%20on%20the%20prototype.%0A%20%20console.log(Bork.prototype.boundFunction)%3B%20%2F%2F%20%3E%20undefined%0A%0A%20%20%2F%2FBound%20functions%20are%20bound%20to%20the%20class%20instance.%0A%20%20console.log(myBork.boundFunction.call(undefined))%3B%20%2F%2F%20%3E%20%22bork%22%0A%0A%20%20%2F%2FStatic%20function%20exists%20on%20the%20class.%0A%20%20console.log(Bork.staticFunction())%3B%20%2F%2F%20%3E%20%22babelIsCool%22)

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

* `spec` -  Class properties are compiled to use `Object.defineProperty. Static fields are now defined even if they are not initialized

## References

* [Proposal: ES Class Fields & Static Properties](https://github.com/jeffmo/es-class-static-properties-and-fields)
