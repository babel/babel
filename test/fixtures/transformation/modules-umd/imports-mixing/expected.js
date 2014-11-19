(function (factory) {
  if (typeof define === "function" && define.amd) {
    define("modules-umd/imports-mixing/expected", ["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  "use strict";

  var foo = _foo["default"];
  var xyz = _foo.baz;
});
