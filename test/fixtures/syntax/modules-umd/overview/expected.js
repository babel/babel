"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  }
})(function (exports, _foo, _fooBar, _directoryFooBar) {
  var foo = _foo.default;
  var foo = _foo;
  var bar = _foo.bar;
  var bar = _foo.foo;
  exports.test = test;
  var test = 5;
  exports.test = test;
  exports.default = test;
});
