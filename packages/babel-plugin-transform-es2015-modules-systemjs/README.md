# babel-plugin-transform-es2015-modules-systemjs

> This plugin transforms ES2015 modules to [SystemJS](https://github.com/systemjs/systemjs).

## Example

**In**

```javascript
export default 42;
```

**Out**

```javascript
System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      _export("default", 42);
    }
  };
});
```

For dynamic import support (`import('./lazy.js').then(m => ...)`), enable the [syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) plugin before this one.

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-modules-systemjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-es2015-modules-systemjs"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-modules-systemjs", {
      // outputs SystemJS.register(...)
      "systemGlobal": "SystemJS"
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-modules-systemjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-systemjs"]
});
```
