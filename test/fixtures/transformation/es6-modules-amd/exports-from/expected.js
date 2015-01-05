"use strict";

define(["exports", "foo"], function (exports, _foo) {
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
