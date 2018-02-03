(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("foo"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.foo);
    global.input = mod.exports;
  }
})(this, function (_foo) {
  "use strict";

  _foo = babelHelpers.interopRequireWildcard(_foo);
  _foo.baz;
});
