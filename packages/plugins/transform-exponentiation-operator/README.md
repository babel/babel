# babel-plugin-transform-exponentiation-operator

Compile exponentiation operator to ES5

## Installation

```sh
$ npm install babel-plugin-transform-exponentiation-operator
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
$ babel --plugins transform-exponentiation-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-exponentiation-operator"]
});
```
