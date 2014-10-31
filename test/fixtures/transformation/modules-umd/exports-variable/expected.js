"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  exports.foo7 = foo7;
  var foo = 1;
  exports.foo = foo;
  var foo2 = function() {};
  exports.foo2 = foo2;
  var foo3;
  exports.foo3 = foo3;
  var _foo4 = 2;
  exports.foo4 = _foo4;
  var _foo5;
  exports.foo5 = _foo5;
  var _foo6 = 3;
  exports.foo6 = _foo6;
  function foo7() {}

  var foo8 = function foo8() {};

  exports.foo8 = foo8;
});
