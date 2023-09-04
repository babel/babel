"use strict";

var _ref;
function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}
function foo(_x) {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function (_ref2) {
    let a = _ref2.a,
      _ref2$b = _ref2.b,
      b = _ref2$b === void 0 ? mandatory("b") : _ref2$b;
    return function* () {
      return Promise.resolve(b);
    }();
  })).apply(this, arguments);
}
