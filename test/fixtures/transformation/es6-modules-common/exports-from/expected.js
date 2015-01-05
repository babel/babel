"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

(function (obj) {
  for (var i in obj) {
    exports[i] = obj[i];
  }
})(require("foo"));

exports.foo = _interopRequire(require("foo"));
exports.foo = _interopRequire(require("foo"));
exports.bar = _interopRequire(require("foo"));
exports.bar = _interopRequire(require("foo"));
exports["default"] = _interopRequire(require("foo"));
exports["default"] = _interopRequire(require("foo"));
exports.bar = _interopRequire(require("foo"));
