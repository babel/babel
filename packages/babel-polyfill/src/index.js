import "core-js/shim";
import "regenerator-runtime/runtime";

if (global._babelPolyfill) {
  console.warn(
    "@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " +
      "and may have consequences if different versions of the polyfills are applied sequentially. " +
      "If you do need to load the polyfill more than once, use @babel/polyfill/lib/noConflict " +
      "instead to bypass the warning.",
  );
}

global._babelPolyfill = true;
