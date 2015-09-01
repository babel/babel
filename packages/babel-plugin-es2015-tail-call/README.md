# babel-plugin-es2015-tail-call

Compile ES2015 tail call to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-tail-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-tail-call"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-tail-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-tail-call"]
});
```
