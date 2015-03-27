(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "babel-runtime/helpers/interop-require"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("babel-runtime/helpers/interop-require"));
  }
})(function (exports, _foo, _babelRuntimeHelpersInteropRequire) {
  "use strict";

  var _interopRequire = _babelRuntimeHelpersInteropRequire["default"];

  var foo = _interopRequire(_foo);
});