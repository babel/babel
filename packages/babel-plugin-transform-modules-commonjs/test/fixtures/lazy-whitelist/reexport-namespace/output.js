"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: get
  });
}

exports.namespace2 = exports.namespace1 = void 0;

function namespace1() {
  const data = babelHelpers.interopRequireDefault(require("white"));

  namespace1 = function () {
    return data;
  };

  return data;
}

_export("namespace1", function () {
  return namespace1();
});

var namespace2 = babelHelpers.interopRequireDefault(require("black"));
exports.namespace2 = namespace2;
