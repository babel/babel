"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _defaults = function (obj, defaults) { for (var key in defaults) { if (obj[key] === undefined) { obj[key] = defaults[key]; } } return obj; };

var _foo = require("foo");

_defaults(exports, _interopRequireWildcard(_foo));

exports.foo = _foo.foo;
exports.foo = _foo.foo;
exports.bar = _foo.bar;
exports.bar = _foo.foo;
exports["default"] = _foo.foo;
exports["default"] = _foo.foo;
exports.bar = _foo.bar;
Object.defineProperty(exports, "__esModule", {
  value: true
});