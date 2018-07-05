"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = babelHelpers.interopRequireDefault(require("bar"));

function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* foo() {});
  return _foo.apply(this, arguments);
}

function foo() {
  return _foo.apply(this, arguments);
}
