# @babel/plugin-transform-block-scoping

> Compile ES2015 block scoping (const and let) to ES5

## Examples

**In**

```javascript
{
  let a = 3
}

let a = 3
```

**Out**

```javascript
{
  var _a = 3;
}

var a = 3;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-block-scoping
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-block-scoping"]
}
```

With options:

```json
{
  "plugins": [
    ["@babel/plugin-transform-block-scoping", {
      "throwIfClosureRequired": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-block-scoping script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-block-scoping"]
});
```

## Options

### `throwIfClosureRequired`
`boolean`, defaults to `false`.

In cases such as the following it's impossible to rewrite let/const without adding an additional function and closure while transforming:

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1);
}
```

In extremely performance-sensitive code, this can be undesirable. If `"throwIfClosureRequired": true` is set, Babel throws when transforming these patterns instead of automatically adding an additional function.

### `tdz`
`boolean`, defaults to `false`.

By default this plugin will ignore the *temporal dead zone (TDZ)* for block-scoped variables. The following code will **not throw an error when transpiled with Babel, which is not spec compliant**:

```javascript
i
let i;
```

If you need these errors you can tell Babel to try and find them by setting `"tdz": true` for this plugin. However, the current implementation might not get all edge cases right and its best to just avoid code like this in the first place.
