# babel-plugin-syntax-class-construtor-call

Allow parsing of do expressions.

## Installation

```sh
$ npm install babel-plugin-syntax-class-construtor-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-class-construtor-call"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-class-construtor-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-class-construtor-call"]
});
```
