(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["foo-bar", "./mylib/foo-bar", "fizzbuzz"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("foo-bar"), require("./mylib/foo-bar"), require("fizzbuzz"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.fooBAR, global.fooBAR, global.fizzBuzz);
    global.actual = mod.exports;
  }
})(this, function (_fooBar, _fooBar3, _fizzbuzz) {
  "use strict";

  var _fooBar2 = babelHelpers.interopRequireDefault(_fooBar);

  var _fooBar4 = babelHelpers.interopRequireDefault(_fooBar3);

  var _fizzbuzz2 = babelHelpers.interopRequireDefault(_fizzbuzz);
});
