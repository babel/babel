(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("loose/module-name-compat/input", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.looseModuleNameCompatInput = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  foobar();
});
