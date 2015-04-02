"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("foo");

require("foo-bar");

require("./directory/foo-bar");

var _foo = require("foo2");

var foo = _interopRequire(_foo);

var _import = require("foo3");

var foo2 = _interopRequireWildcard(_import);

var _bar = require("foo4");

var _bar2 = require("foo5");

exports.test = test;
var test = 5;

exports.test = test;
_bar.bar;
_bar2.foo;
foo;
