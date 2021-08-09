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

_export("default", function () {
  return _foo().default;
});

function _foo() {
  const data = babelHelpers.interopRequireDefault(require("foo"));

  _foo = function () {
    return data;
  };

  return data;
}
