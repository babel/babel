"use strict";

define(["foo", "foo-bar", "./directory/foo-bar"], function (_foo, _fooBar, _directoryFooBar) {
  var exports = {};

  var foo = _foo.default;
  var foo = _foo;
  var bar = _foo.bar;
  var bar = _foo.foo;
  exports.test = test;
  var test = 5;
  exports.test = test;
  exports.default = test;

  return exports;
});
