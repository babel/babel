(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("assumption-constantReexports-enumerableModuleMeta/module-name/input", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.assumptionConstantReexportsEnumerableModuleMetaModuleNameInput = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  foobar();
});
