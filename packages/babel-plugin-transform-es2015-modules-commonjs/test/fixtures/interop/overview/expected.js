"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var _foo = babelHelpers.interopRequireDefault(require("foo2"));

var _foo2 = babelHelpers.interopRequireWildcard(require("foo3"));

var _foo3 = require("foo4");

var _foo4 = require("foo5");

exports.test = test;
var test = exports.test = 5;

_foo3.bar;
_foo4.foo;
_foo.default;