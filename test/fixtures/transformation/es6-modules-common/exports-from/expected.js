"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var _interopRequireWildcard = function (obj) {
  return obj && obj.constructor === Object ? obj : {
    "default": obj
  };
};

var _exportsWildcard = function (obj) {
  for (var i in obj) {
    if (exports[i] !== undefined) {
      exports[i] = obj[i];
    }
  }
};

_exportsWildcard(_interopRequireWildcard(require("foo")));

exports.foo = _interopRequire(require("foo"));
exports.foo = _interopRequire(require("foo"));
exports.bar = _interopRequire(require("foo"));
exports.bar = _interopRequire(require("foo"));
exports["default"] = _interopRequire(require("foo"));
exports["default"] = _interopRequire(require("foo"));
exports.bar = _interopRequire(require("foo"));
