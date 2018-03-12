(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["foo-bar", "./mylib/foo-bar", "fizzbuzz"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("foo-bar"), require("./mylib/foo-bar"), require("fizzbuzz"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.fooBar, global.fooBar, global.fizzbuzz);
    global.input = mod.exports;
  }
})(this, function (_fooBar, _fooBar2, _fizzbuzz) {
  "use strict";

  _fooBar = babelHelpers.interopRequireDefault(_fooBar);
  _fooBar2 = babelHelpers.interopRequireDefault(_fooBar2);
  _fizzbuzz = babelHelpers.interopRequireDefault(_fizzbuzz);
});
