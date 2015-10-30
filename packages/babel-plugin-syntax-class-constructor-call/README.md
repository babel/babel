# babel-plugin-syntax-class-constructor-call

Allow parsing of do expressions.

## Installation

```sh
$ npm install babel-plugin-syntax-class-constructor-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-class-constructor-call"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-class-constructor-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-class-constructor-call"]
});
```
