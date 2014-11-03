(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  }
})(function (exports) {
  "use strict";

  exports.default = 42;
  exports.default = {};
  exports.default = [];
  exports.default = foo;
  exports.default = function() {};

  exports.default = function() {};

  exports.default = function foo() {};

  exports.default = function foo() {};
});
