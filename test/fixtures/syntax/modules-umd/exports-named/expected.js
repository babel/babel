"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  exports.foo = foo;
  exports.foo = foo;
  exports.bar = bar;
  exports.bar = foo;
  exports.default = foo;
  exports.default = foo;
  exports.bar = bar;
});
