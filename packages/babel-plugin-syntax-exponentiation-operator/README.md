# babel-plugin-syntax-exponentiation-operator

> Allow parsing of the exponentiation operator.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-exponentiation-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-exponentiation-operator"]
}
```

### Via CLI

```sh
babel --plugins syntax-exponentiation-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-exponentiation-operator"]
});
```
