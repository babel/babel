"use strict";

define([], function () {
  var exports = {};

  exports.foo = foo;
  exports.foo = foo;
  exports.bar = bar;
  exports.bar = foo;
  exports.default = foo;
  exports.default = foo;
  exports.bar = bar;

  return exports;
});
