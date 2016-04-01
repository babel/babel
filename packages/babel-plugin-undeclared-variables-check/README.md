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

You can also declare custom global variables and / or a predefined environment.
Currently only `"node"` is implemented.

```json
{
  "plugins": [
    ["undeclared-variables-check", {
      "env": "node",
      "globals": [
        "someExtraCustomGlobal"
      ]
    }]
  ]
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
