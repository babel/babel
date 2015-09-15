# babel-plugin-syntax-trailing-function-commas

Compile trailing function commas to ES5

## Installation

```sh
$ npm install babel-plugin-syntax-trailing-function-commas
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-trailing-function-commas"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-trailing-function-commas script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-trailing-function-commas"]
});
```
