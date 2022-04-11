# @babel/plugin-codemod-object-assign-to-object-spread

Transforms old code that uses `Object.assign` with an Object Literal as
the first param to use Object Spread syntax.

## Examples

```js
const obj = Object.assign({
  test1: 1,
}, other, {
  test2: 2,
}, other2);
```

Is transformed to:

```js
const obj = {
  test1: 1,
  ...other,
  test2: 2,
  ...other2,
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-codemod-object-assign-to-object-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```jsonc
{
  "plugins": ["@babel/plugin-codemod-object-assign-to-object-spread"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-codemod-object-assign-to-object-spread script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-codemod-object-assign-to-object-spread"]
});
```
