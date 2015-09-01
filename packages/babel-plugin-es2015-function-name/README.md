# babel-plugin-es2015-function-name

Apply ES2015 function.name semantics to all functions

## Installation

```sh
$ npm install babel-plugin-es2015-function-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-function-name"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-function-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-function-name"]
});
```
