# @babel/plugin-proposal-nullish-coalescing-operator

> Replace `??` with an inline helper.

## Example

**In**

```javascript
var foo = object.foo ?? "default";
```

**Out**

```javascript
var _object$foo;

var foo = (_object$foo = object.foo) !== null && _object$foo !== void 0 ? _object$foo : "default";
```

> **NOTE:** We cannot use `!= null` here because `document.all == null` and
> `document.all` has been deemed not "nullish".

## Installation

```sh
npm install --save-dev @babel/plugin-proposal-nullish-coalescing-operator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-proposal-nullish-coalescing-operator"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-proposal-nullish-coalescing-operator script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

When `true`, this transform will pretend `document.all` does not exist,
and perform loose equality checks with `null` instead of strict equality checks
against both `null` and `undefined`.

#### Example

**In**

```javascript
var foo = object.foo ?? "default";
```

**Out**

```javascript
var _object$foo;

var foo = (_object$foo = object.foo) != null ? _object$foo : "default";
```

## References

* [Proposal: Nullish Coalescing](https://github.com/tc39-transfer/proposal-nullish-coalescing)
