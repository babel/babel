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

You can also declare custom global variables and / or a predefined environments.

```json
{
  "plugins": [
    ["undeclared-variables-check", {
      "env": "node",
      "globals": [
        "myGlobalA",
        "myGlobalB"
      ]
    }]
  ]
}
```
With multiple environments:
```json
{
  "plugins": [
    ["undeclared-variables-check", {
      "env": ["node", "mocha"],
      "globals": [
        "myGlobalA",
        "myGlobalB"
      ]
    }]
  ]
}
```
Under the hood this plugin uses the [globals](https://github.com/sindresorhus/globals) package to determine environment specific globals.

For a complete list of supported environments visit [globals.json](https://github.com/sindresorhus/globals/blob/master/globals.json)

**NOTE:** By default all environment and custom globals are cached to improve performance. If you wish to disable caching you can do this by setting `"cacheGlobals": false` in the plugin options.

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
