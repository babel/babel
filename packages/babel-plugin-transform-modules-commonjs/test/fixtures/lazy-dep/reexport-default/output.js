"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
_defineGetter(exports, "default", function () {
  return _foo().default;
});
function _foo() {
  const data = babelHelpers.interopRequireDefault(require("foo"));
  _foo = function () {
    return data;
  };
  return data;
}
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
