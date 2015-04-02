(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "babel-runtime/es5/helpers/interop-require"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("babel-runtime/es5/helpers/interop-require"));
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports, global.foo, global._interopRequire);
    global.actual = module.exports;
  }
})(this, function (exports, _foo, _babelRuntimeEs5HelpersInteropRequire) {
  "use strict";

  var _foo2 = _babelRuntimeEs5HelpersInteropRequire["default"](_foo);
});
