"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    return yield foo();
  });
  return _wrapped.apply(this, arguments);
}

var _default = function _default() {
  return _wrapped.apply(this, arguments);
};

exports.default = _default;
