# @babel/plugin-transform-async-to-promises

> Turn async functions into ES2015 Promises

## Example

**In**

```javascript
```

**Out**

```javascript
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-async-to-promises
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["@babel/plugin-transform-async-to-promises"]
}
```

With options:

```json
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-async-to-promises script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-async-to-promises"]
});
```

## References

* [Proposal: Async Functions for ECMAScript](https://github.com/tc39/ecmascript-asyncawait)
