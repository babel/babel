"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test2 = exports.test = undefined;

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var foo = babelHelpers.interopRequireDefault(require("foo2"));
var foo2 = babelHelpers.interopRequireWildcard(require("foo3"));

var _foo = require("foo4");

var _foo2 = require("foo5");

exports.test = test;
var test2 = exports.test2 = 5;
_foo.bar;
_foo2.foo;
foo;
