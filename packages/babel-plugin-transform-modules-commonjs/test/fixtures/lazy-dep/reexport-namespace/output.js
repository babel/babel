"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get
  });
}

exports.namespace = void 0;

function namespace() {
  const data = babelHelpers.interopRequireDefault(require("foo"));

  namespace = function () {
    return data;
  };

  return data;
}

_export("namespace", () => namespace());
