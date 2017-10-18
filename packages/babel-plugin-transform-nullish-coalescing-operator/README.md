# @babel/plugin-transform-nullish-coalescing-operator

> Replace `??` with an inline helper.

## Example

**In**

```javascript
var foo = object.foo ?? "default";
```

**Out**

```javascript
var _object$foo;

var foo = (_object$foo = object.foo, _object$foo !== null && _object$foo !== void 0 ? _object$foo : "default");
```

> **NOTE:** We cannot use `!= null` here because `document.all == null` and
> `document.all` has been deemed not "nullish".

## Installation

```sh
npm install --save-dev @babel/plugin-transform-nullish-coalescing-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-nullish-coalescing-operator"]
}
```

### Via CLI

```sh
babel --plugins transform-nullish-coalescing-operator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-nullish-coalescing-operator"]
});
```
