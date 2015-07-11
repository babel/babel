(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.foo);
    global.actual = mod.exports;
  }
})(this, function (exports, _foo) {
  "use strict";

  var _foo2 = babelHelpers.interopRequireDefault(_foo);

  var _foo22 = babelHelpers.interopRequireDefault(_foo);

  _foo2["default"];
  _foo22["default"];
});