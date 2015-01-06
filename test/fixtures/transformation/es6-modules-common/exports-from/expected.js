"use strict";

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

exports.foo = require("foo").foo;
exports.foo = require("foo").foo;
exports.bar = require("foo").bar;
exports.bar = require("foo").foo;
exports["default"] = require("foo").foo;
exports["default"] = require("foo").foo;
exports.bar = require("foo").bar;
