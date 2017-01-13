# babel-plugin-undeclared-variables-check

> This plugin throws a compile-time error on references to undeclared variables.

## Example

**In**

```javascript
function foo() {}
foo();
bar();
```

**Out**

```
ReferenceError: stdin: Line 3: Reference to undeclared variable "bar" - did you mean "foo"?
  1 | function foo() {}
  2 | foo();
> 3 | bar();
    | ^
  4 |
```

## Installation

```sh
npm install --save-dev babel-plugin-undeclared-variables-check
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
babel --plugins undeclared-variables-check script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["undeclared-variables-check"]
});
```
