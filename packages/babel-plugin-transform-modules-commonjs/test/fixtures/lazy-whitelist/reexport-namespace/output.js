"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namespace2 = exports.namespace1 = void 0;
var namespace1 = babelHelpers.interopRequireDefault(require("white"));
exports.namespace1 = namespace1;

function namespace2() {
  const data = babelHelpers.interopRequireDefault(require("black"));

  namespace2 = function () {
    return data;
  };

  return data;
}

Object.defineProperty(exports, "namespace2", {
  enumerable: true,
  get: function () {
    return namespace2();
  }
});
