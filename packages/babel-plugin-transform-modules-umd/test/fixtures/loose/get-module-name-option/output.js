(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("my custom module name", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.myCustomModuleName = mod.exports;
  }
})(typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : this, function () {
  "use strict";
});
