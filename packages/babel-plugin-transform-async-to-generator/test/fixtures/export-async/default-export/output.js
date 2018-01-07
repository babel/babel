"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = myFunc;

function myFunc() {
  return _myFunc.apply(this, arguments);
}

function _myFunc() {
  _myFunc = babelHelpers.asyncToGenerator(function* () {});
  return _myFunc.apply(this, arguments);
}
