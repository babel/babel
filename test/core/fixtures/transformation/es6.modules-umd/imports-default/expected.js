(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports, global.foo);
    global.actual = module.exports;
  }
})(this, function (exports, _foo) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var foo = _interopRequire(_foo);

  var foo2 = _interopRequire(_foo);
});
