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

`throwIfClosureRequired`

In cases such as the following it's impossible to rewrite let/const without adding an additional function and closure while transforming:

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1);
}
```

In extremely performance-sensitive code, this can be undesirable. If `"throwIfClosureRequired": true` is set, Babel throws when transforming these patterns instead of automatically adding an additional function.

`tdz`

If `"tdz": true` is set, variable will not be hoisted and accessing the variable before declaration will throw ReferenceError due to **temporal dead zone (TDZ)**.

```javascript
console.log(x); // ReferenceError: x is not defined - temporal dead zone
let x;
```

