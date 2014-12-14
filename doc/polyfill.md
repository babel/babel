# Polyfill

6to5 includes a polyfill that includes a custom
[regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) and
[core.js](https://github.com/zloirock/core-js).

This will emulate a full ES6 environment. This polyfill is automatically loaded
when using [6to5-node](usage.md#node) and [6to5/register](usage.md#register-hook).

## Usage

### Node

You need to include the polyfill require at the top the **entry point** to your
application.

```javascript
require("6to5/polyfill");
```

### Browser

Available from the `browser-polyfill.js` file within the 6to5 directory of an
npm release. This needs to be included **before** all your compiled 6to5 code.
You can either prepend it to your compiled code or include it in a `<script>`
before it.
