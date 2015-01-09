"use strict";

var _interopRequireWildcard = function (obj) {
  return obj && obj.constructor === Object ? obj : {
    "default": obj
  };
};

var _defaults = function (obj, defaults) {
  for (var key in defaults) {
    if (obj[key] === undefined) {
      obj[key] = defaults[key];
    }
  }

  return obj;
};

_defaults(exports, _interopRequireWildcard(require("foo")));

exports.foo = require("foo").foo;
exports.foo = require("foo").foo;
exports.bar = require("foo").bar;
exports.bar = require("foo").foo;
exports["default"] = require("foo").foo;
exports["default"] = require("foo").foo;
exports.bar = require("foo").bar;
