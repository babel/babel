"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  exports = foo;
  exports = 42;
  exports = {};
  exports = [];
  exports = foo;
  exports = function () {};

  exports = function () {};

  function foo() {}
  var Foo = function Foo() {};

  exports = Foo;
});
