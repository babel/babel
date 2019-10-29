function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.input = mod.exports;
  }
})((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object" ? globalThis : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : this, function () {
  "use strict";

  import("foo"); // warns
});
