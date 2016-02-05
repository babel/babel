'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = undefined;

var _bar = require('bar');

var _bar2 = babelHelpers.interopRequireDefault(_bar);

let foo = exports.foo = function () {
  var ref = babelHelpers.asyncToGenerator(function* () {});
  return function foo() {
    return ref.apply(this, arguments);
  };
}();
