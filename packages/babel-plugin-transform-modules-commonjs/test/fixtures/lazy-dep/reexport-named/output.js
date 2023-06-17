"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
_defineGetter(exports, "named", function () {
  return _foo().named;
});
function _foo() {
  const data = require("foo");
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
