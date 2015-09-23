# babel-plugin-transform-function-bind

Compile function bind operator to ES5

## Installation

```sh
$ npm install babel-plugin-transform-function-bind
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-function-bind"]
}
```

### Via CLI

```sh
$ babel --plugins transform-function-bind script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-function-bind"]
});
```
