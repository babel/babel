(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.test = _exports.f = _exports.e = _exports.c = _exports.a = void 0;
  var _test;
  var test = _exports.test = 2;
  _exports.test = test = 5;
  _test = test++, _exports.test = test, _test;
  (function () {
    var test = 2;
    test = 3;
    test++;
  })();
  var a = _exports.a = 2;
  _exports.a = a = 3;
  var b = _exports.c = 2;
  _exports.c = b = 3;
  var d = _exports.f = _exports.e = 3;
  _exports.f = _exports.e = d = 4;
});
