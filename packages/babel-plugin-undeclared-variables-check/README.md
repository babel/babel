# babel-plugin-undeclared-variables-check

Throw a compile-time error on references to undeclared variables

## Installation

```sh
$ npm install babel-plugin-undeclared-variables-check
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["undeclared-variables-check"]
}
```

### Via CLI

```sh
$ babel --plugins undeclared-variables-check script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["undeclared-variables-check"]
});
```
