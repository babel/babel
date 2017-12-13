"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = babelHelpers.interopRequireDefault(require("bar"));

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* () {});
  return _foo.apply(this, arguments);
}
