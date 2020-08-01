(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("legacyDefaultOnlyExport/module-name-with-overridden-global-compat/input", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.legacyDefaultOnlyExportModuleNameWithOverriddenGlobalCompatInput = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  var _default = 42;
  _exports = _default;
});
