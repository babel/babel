(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("umd/module-name/input", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.umdModuleNameInput = mod.exports;
  }
})(typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : this, function () {
  "use strict";

  foobar();
});
