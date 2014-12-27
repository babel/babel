"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var foo = _interopRequire(require("foo"));

var foo = require("foo");

var bar = require("foo").bar;
var bar = require("foo").foo;
exports.test = test;
var test = exports.test = 5;

exports = module.exports = test;
