# @babel/plugin-transform-jscript

> This plugin allows Babel to transform named function expressions into function declarations to get around some [particularly nasty JScript bugs](https://kangax.github.io/nfe/#jscript-bugs) related to name function expressions.

## Example

**In**

```javascript
var foo = function bar() {

};
```

**Out**

```javascript
"use strict";

var foo = (function () {
  function bar() {}

  return bar;
})();
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-jscript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-jscript"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-jscript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-jscript"]
});
```
