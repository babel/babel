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
_export("namespace", function () {
  return namespace();
});
function _export(name, fn) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get: fn
  });
}
