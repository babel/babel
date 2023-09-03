"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;
var _bar = babelHelpers.interopRequireDefault(require("bar"));
function foo() {
  return (exports.foo = foo = babelHelpers.asyncToGenerator(function* () {})).apply(this, arguments);
}
