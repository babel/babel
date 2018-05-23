# @babel/plugin-transform-exponentiation-operator

> Compile exponentiation operator to ES5

## Example

**In**

```javascript
let x = 10 ** 2;

x **= 3;
```

**Out**

```javascript
let x = Math.pow(10, 2);

x = Math.pow(x, 3);
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
  "plugins": ["@babel/plugin-transform-exponentiation-operator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-exponentiation-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-exponentiation-operator"]
});
```

## References

* [Proposal: Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator)
* [Spec: Exponential Operator](https://rwaldron.github.io/exponentiation-operator/)
