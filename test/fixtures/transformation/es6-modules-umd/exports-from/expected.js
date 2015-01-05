"use strict";

(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  (function (obj) {
    for (var i in obj) {
      exports[i] = obj[i];
    }
  })(_foo);

  exports.foo = _interopRequire(_foo);
  exports.foo = _interopRequire(_foo);
  exports.bar = _interopRequire(_foo);
  exports.bar = _interopRequire(_foo);
  exports["default"] = _interopRequire(_foo);
  exports["default"] = _interopRequire(_foo);
  exports.bar = _interopRequire(_foo);
});
