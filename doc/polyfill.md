# Polyfill

6to5 includes a polyfill that includes the
[regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) and the
[es6-shim](https://github.com/paulmillr/es6-shim) and
[es6-symbol](https://github.com/medikoo/es6-symbol) polyfills.

This will emulate a full ES6 environment. This polyfill is automatically loaded
when using [6to5-node](usage.md#node).

## Usage

### Node

```javascript
require("6to5/polyfill");
```

### Browser

Available from the `browser-polyfill.js` file within the 6to5 directory of an
npm release.
