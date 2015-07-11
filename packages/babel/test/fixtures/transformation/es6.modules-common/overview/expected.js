"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var _foo2 = require("foo2");

var _foo22 = babelHelpers.interopRequireDefault(_foo2);

var _foo3 = require("foo3");

var foo2 = babelHelpers.interopRequireWildcard(_foo3);

var _foo4 = require("foo4");

var _foo5 = require("foo5");

exports.test = test;
var test = 5;

exports.test = test;
_foo4.bar;
_foo5.foo;
_foo22["default"];