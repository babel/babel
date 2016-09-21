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
    global.actual = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {};

  exports.default = foo;
  exports.default = 42;
  exports.default = {};
  exports.default = [];
  exports.default = foo;
  exports.default = class {};
  function foo() {}
  class Foo {}
  exports.default = Foo;
  exports.default = foo;

  exports.default = function () {
    return "foo";
  }();
});
