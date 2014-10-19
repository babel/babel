"use strict";

define(["exports"], function (exports) {
  exports.default = 42;
  exports.default = {};
  exports.default = [];
  exports.default = foo;
  exports.default = function() {};

  exports.default = function() {
    var _class = function() {};
    return _class;
  }();

  exports.default = function foo() {};

  exports.default = function() {
    var foo = function foo() {};
    return foo;
  }();
});
