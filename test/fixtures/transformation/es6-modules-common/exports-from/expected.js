"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; };

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