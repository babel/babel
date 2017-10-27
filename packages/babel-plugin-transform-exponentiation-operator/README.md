# @babel/plugin-transform-exponentiation-operator

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

## Installation

```sh
npm install --save-dev @babel/plugin-transform-exponentiation-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-exponentiation-operator"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-exponentiation-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-exponentiation-operator"]
});
```

## References

* [Proposal: Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator)
* [Spec: Exponential Operator](https://rwaldron.github.io/exponentiation-operator/)
