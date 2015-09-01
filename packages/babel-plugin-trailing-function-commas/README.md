# babel-plugin-trailing-function-commas

Compile trailing function commas to ES5

## Installation

```sh
$ npm install babel-plugin-trailing-function-commas
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["trailing-function-commas"]
}
```

### Via CLI

```sh
$ babel --plugins trailing-function-commas script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["trailing-function-commas"]
});
```
