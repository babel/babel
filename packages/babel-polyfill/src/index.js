// Cover all standardized ES APIs.
import "core-js/es";

// Ensure that we polyfill ES6 compat for anything web-related, if it exists.
import "core-js/web";

import "regenerator-runtime/runtime";

if (global._babelPolyfill && typeof console !== "undefined" && console.warn) {
  console.warn(
    "@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " +
      "and may have consequences if different versions of the polyfills are applied sequentially. " +
      "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " +
      "instead to bypass the warning.",
  );
}

global._babelPolyfill = true;
