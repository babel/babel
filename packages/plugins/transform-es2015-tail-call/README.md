# babel-plugin-transform-es2015-tail-call

Compile ES2015 tail call to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-tail-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-tail-call"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-tail-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-tail-call"]
});
```
