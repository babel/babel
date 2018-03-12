# @babel/helper-plugin-utils

The intention of this module is to provide a place for us to expose a
standardized API layer over top of what Babel's core API provides on its own.

This is not aiming to implement APIs that are missing on a given Babel version,
but it is means to provide clear error messages if a plugin is run on a version
of Babel that doesn't have the APIs that the plugin is trying to use.

Every one of Babel's core plugins and presets will use this module, and ideally
because of that its size should be kept to a miminum because this may or may
not be deduplicated when installed.


## Usage

```js
import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options, dirname) => {
  return {};
});
```


## What this does

Currently, this plugin provides a few services to ensure that plugins function
well-enough to throw useful errors.

### `options` is always passed

Babel 6 does not pass a second parameter. This frequently means that plugins
written for Babel 7 that use `options` will attempt to destructure options
out of an `undefined` value. By supplying the default, we avoid that risk.

### `api.assertVersion` always exists

Babel 6 and early betas of Babel 7 do not have `assertVersion`, so this
wrapper ensures that it exists and throws a useful error message when not
supplied by Babel itself.
