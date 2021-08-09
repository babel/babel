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

_export("named", function () {
  return _foo().named;
});

function _foo() {
  const data = require("foo");

  _foo = function () {
    return data;
  };

  return data;
}
