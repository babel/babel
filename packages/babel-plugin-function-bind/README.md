# babel-plugin-function-bind

Compile function bind operator to ES5

## Installation

```sh
$ npm install babel-plugin-function-bind
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["function-bind"]
}
```

### Via CLI

```sh
$ babel --plugins function-bind script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["function-bind"]
});
```
