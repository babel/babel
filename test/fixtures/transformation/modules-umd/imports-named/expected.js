"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  var bar = _foo.bar;
  var bar = _foo.bar;
  var baz = _foo.baz;
  var baz = _foo.bar;
  var baz = _foo.bar;
  var xyz = _foo.xyz;
});
