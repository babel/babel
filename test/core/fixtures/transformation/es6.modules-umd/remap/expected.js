(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports);
    global.actual = module.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var test = 2;
  exports.test = test;
  test = exports.test = 5;
  test = exports.test += 1;

  (function () {
    var test = 2;
    test = 3;
    test++;
  })();

  var a = 2;
  exports.a = a;

  a = exports.a = 3;

  var b = 2;
  exports.c = b;

  b = exports.c = 3;
});