# @babel/plugin-transform-block-scoped-functions

> Babel plugin to ensure function declarations at the block level are block scoped.

## Examples

**In**

```javascript
{
  function name (n) {
    return n;
  }
}

name("Steve");
```

**Out**

```javascript
{
  var _name = function _name(n) {
    return n;
  };
}

name("Steve");
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-block-scoped-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-block-scoped-functions"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-block-scoped-functions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-block-scoped-functions"]
});
```
