# babel-plugin-syntax-optional-catch-binding

> This plugin allows Babel to parse optional catch bindings.

## Example

**Syntax**

```javascript
try {
  throw 0;
} catch {
  doSomethingWhichDoesntCareAboutTheValueThrown();
  console.log("Yay, code executes!");
}
```

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-optional-catch-binding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-optional-catch-binding"]
}
```

### Via CLI

```sh
babel --plugins syntax-optional-catch-binding script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["syntax-optional-catch-binding"]
});
```

## References

* [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)
