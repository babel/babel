"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
_defineGetter(exports, "default", function () {
  return _white().default;
});
function _white() {
  const data = babelHelpers.interopRequireDefault(require("white"));
  _white = function () {
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
