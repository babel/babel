(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "babel-runtime/es5/helpers/interop-require"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("babel-runtime/es5/helpers/interop-require"));
  }
})(function (exports, _foo, _babelRuntimeEs5HelpersInteropRequire) {
  "use strict";

  var _interopRequire = _babelRuntimeEs5HelpersInteropRequire["default"];

  var foo = _interopRequire(_foo);
});