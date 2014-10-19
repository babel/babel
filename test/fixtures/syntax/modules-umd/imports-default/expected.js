"use strict";

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(this, function (exports, _foo) {
  var foo = _foo.default;
  var foo = _foo.default;
});
