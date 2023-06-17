"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namespace = void 0;
function namespace() {
  const data = babelHelpers.interopRequireWildcard(require("foo"));
  namespace = function () {
    return data;
  };
  return data;
}
_defineGetter(exports, "namespace", function () {
  return namespace();
});
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
