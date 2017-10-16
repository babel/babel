# @babel/plugin-codemod-optional-catch-binding

> If the argument bound to the catch block is not referenced in the catch block, that argument and the catch binding is removed.


## Examples

```js
try {
  throw 0;
} catch (err) {
  console.log("it failed, but this code executes");
}
```
Is transformed to:

```js
try {
  throw 0;
} catch {
  console.log("it failed, but this code executes");
}
```


## Installation

```sh
npm install --save-dev babel-plugin-codemod-optional-catch-binding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["codemod-optional-catch-binding"]
}
```

### Via CLI

```sh
babel --plugins codemod-optional-catch-binding script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["codemod-optional-catch-binding"]
});
```

## References
This codemod updates your source code in line with the following proposal:
- [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)
