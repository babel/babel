(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "babel-runtime/helpers"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("babel-runtime/helpers"));
  }
})(function (exports, _foo, _babelRuntimeHelpers) {
  "use strict";

  var _babelHelpers = _babelRuntimeHelpers["default"];

  var foo = _babelHelpers.interopRequire(_foo);
});