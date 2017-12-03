# babel-plugin-syntax-function-bind

Allow parsing of function bind.

## Installation

```sh
$ npm install babel-plugin-syntax-function-bind
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-function-bind"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-function-bind script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-function-bind"]
});
```
