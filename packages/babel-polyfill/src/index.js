if (global._babelPolyfill) {
  throw new Error("only one instance of @babel/polyfill is allowed");
}
global._babelPolyfill = true;

import "core-js/shim";
import "regenerator-runtime/runtime";
