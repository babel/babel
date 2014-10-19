"use strict";

define(["foo"], function (_foo) {
  var exports = {};

  (function(obj) {
    for (var i in obj) {
      exports[i] = obj[i];
    }
  })(_foo);

  exports.foo = _foo.foo;
  exports.foo = _foo.foo;
  exports.bar = _foo.bar;
  exports.bar = _foo.foo;
  exports.default = _foo.foo;
  exports.default = _foo.foo;
  exports.bar = _foo.bar;

  return exports;
});
