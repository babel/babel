# babel-plugin-exponentiation-operator

Compile exponentiation operator to ES5

## Installation

```sh
$ npm install babel-plugin-exponentiation-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["exponentiation-operator"]
}
```

### Via CLI

```sh
$ babel --plugins exponentiation-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["exponentiation-operator"]
});
```
