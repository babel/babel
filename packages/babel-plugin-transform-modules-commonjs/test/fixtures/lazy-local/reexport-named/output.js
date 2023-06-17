"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
_defineGetter(exports, "named", function () {
  return _foo.named;
});
var _foo = require("./foo");
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
