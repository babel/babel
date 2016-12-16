# babel-plugin-transform-exponentiation-operator

> Compile exponentiation operator to ES5

## Example

```js
// x ** y

let squared = 2 ** 2;
// same as: 2 * 2

let cubed = 2 ** 3;
// same as: 2 * 2 * 2


// x **= y

let a = 2;
a **= 2;
// same as: a = a * a;

let b = 3;
b **= 3;
// same as: b = b * b * b;
```
[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=%2F%2F%20x%20**%20y%0A%0Alet%20squared%20%3D%202%20**%202%3B%0A%2F%2F%20same%20as%3A%202%20*%202%0A%0Alet%20cubed%20%3D%202%20**%203%3B%0A%2F%2F%20same%20as%3A%202%20*%202%20*%202%0A%0A%0A%2F%2F%20x%20**%3D%20y%0A%0Alet%20a%20%3D%202%3B%0Aa%20**%3D%202%3B%0A%2F%2F%20same%20as%3A%20a%20%3D%20a%20*%20a%3B%0A%0Alet%20b%20%3D%203%3B%0Ab%20**%3D%203%3B%0A%2F%2F%20same%20as%3A%20b%20%3D%20b%20*%20b%20*%20b%3B)

## Installation

```sh
npm install --save-dev babel-plugin-transform-exponentiation-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-exponentiation-operator"]
}
```

### Via CLI

```sh
babel --plugins transform-exponentiation-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-exponentiation-operator"]
});
```

## References

* [Proposal: Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator)
* [Spec: Exponential Operator](https://rwaldron.github.io/exponentiation-operator/)
