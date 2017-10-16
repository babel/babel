# babel-plugin-transform-es2015-modules-amd

> This plugin transforms ES2015 modules to [Asynchronous Module Definition (AMD)](https://github.com/amdjs/amdjs-api).

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = 42;
});
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-es2015-modules-amd
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-modules-amd"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-modules-amd script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-es2015-modules-amd"]
});
```

### Options

See options for `babel-plugin-transform-es2015-commonjs`.
