"use strict";

var _interopRequireWildcard = function (obj) {
  return obj && obj.__esModule ? obj["default"] : {
    "default": obj
  };
};

var _interopRequire = function (obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var foo = _interopRequire(require("foo"));

var foo2 = _interopRequireWildcard(require("foo"));

var bar = require("foo").bar;
var bar2 = require("foo").foo;
exports.test = test;
var test = exports.test = 5;
