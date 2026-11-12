(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["es6-promise"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("es6-promise"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.Promise);
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_es6Promise) {
  "use strict";
});
