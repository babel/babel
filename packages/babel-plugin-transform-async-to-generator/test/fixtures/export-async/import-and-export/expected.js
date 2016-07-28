'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = undefined;

let foo = exports.foo = (() => {
  var _ref = babelHelpers.asyncToGenerator(function* () {});

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

var _bar = require('bar');

var _bar2 = babelHelpers.interopRequireDefault(_bar);
