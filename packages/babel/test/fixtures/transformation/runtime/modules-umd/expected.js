(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "babel-runtime/helpers/interop-require-default"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("babel-runtime/helpers/interop-require-default"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.foo, global._interopRequireDefault);
    global.actual = mod.exports;
  }
})(this, function (exports, _foo, _babelRuntimeHelpersInteropRequireDefault) {
  "use strict";

  var _foo2 = (0, _babelRuntimeHelpersInteropRequireDefault["default"])(_foo);
});