# @babel/plugin-transform-nullish-coalescing-operator

> Replace `??` with an inline helper.

## Example

**In**

```javascript
var foo = object.foo ?? "default";
```

**Out**

```javascript
var foo = object.foo != null ? object.foo : "default";
```

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
