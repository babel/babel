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

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _foo2 = _interopRequire(_foo);

  var _foo22 = _interopRequire(_foo);

  _foo2;
  _foo22;
});