"use strict";

var _foo = require("foo");

var _foo2 = babelHelpers.interopRequireDefault(_foo);

var _bar = require("bar");

var _bar2 = babelHelpers.interopRequireDefault(_bar);

var _abc = require("abc");

var _abc2 = babelHelpers.interopRequireDefault(_abc);

_foo2.default;
_foo.baz;

console.log(_bar2.default, _bar.b);

console.log(_abc.c, _abc2.default);
