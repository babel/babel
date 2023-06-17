"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
_defineGetter(exports, "named1", function () {
  return _white().named1;
});
_defineGetter(exports, "named2", function () {
  return _black.named2;
});
function _white() {
  const data = require("white");
  _white = function () {
    return data;
  };
  return data;
}
var _black = require("black");
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
