(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "babel-runtime/helpers/interop-require"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("babel-runtime/helpers/interop-require"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.foo, global._interopRequire);
    global.actual = mod.exports;
  }
})(this, function (exports, _foo, _babelRuntimeHelpersInteropRequire) {
  "use strict";

  var _foo2 = (0, _babelRuntimeHelpersInteropRequire["default"])(_foo);
});
