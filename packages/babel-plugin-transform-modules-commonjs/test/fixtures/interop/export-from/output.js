"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _foo = require("foo");
_reexports(exports, _foo);
function _reexports(exports, namespace) {
  Object.keys(namespace).forEach(function (k) {
    if (k === "default" || k === "__esModule") return;
    if (k in exports && exports[k] === namespace[k]) return;
    _defineGetter(exports, k, function () {
      return namespace[k];
    });
  });
}
function _defineGetter(obj, prop, fn) {
  Object.defineProperty(obj, prop, {
    enumerable: true,
    get: fn
  });
}
