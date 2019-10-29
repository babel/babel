(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("MyLib", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.MyLib = mod.exports;
  }
})(typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : this, function () {
  "use strict";

  foobar();
});
