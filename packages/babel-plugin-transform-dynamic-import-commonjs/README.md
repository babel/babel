# babel-plugin-transform-dynamic-import-commonjs

> This plugin translates dynamic `import(specifier)` calls into `Promise`s for a `require(specifier)` module.

Note that this plugin will produce calls to the ordinary `require` function,
so using this with bundlers that implement code splitting will **prevent**
code splitting.

## Example

**In**

```javascript
import('os')
.then(os => os.default.uptime());
```

**Out**

```javascript
Promise.resolve().then(() => babelHelpers._specInteropRequire(require('os')))
.then(os => os.default.uptime());
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-dynamic-import-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["transform-dynamic-import-commonjs"]
}
```

### Via CLI

```sh
babel --plugins transform-dynamic-import-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-dynamic-import-commonjs"]
});
```
