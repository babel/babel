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
  return _white().default;
});

function _white() {
  const data = babelHelpers.interopRequireDefault(require("white"));

  _white = function () {
    return data;
  };

  return data;
}
