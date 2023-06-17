"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = ["z", "a", "b", "d", "e", "f", "c"];
exports.a = void 0;
exports.b = b;
_defineGetter(exports, "c", function () {
  return _mod.c;
});
exports.d = void 0;
exports.default = _default;
exports.z = exports.f = exports.e = void 0;
var _mod = require("mod");
_reexports(exports, _mod, _exportNames);
function _reexports(exports, namespace, exportNames) {
  Object.keys(namespace).forEach(function (k) {
    if (k === "default" || k === "__esModule") return;
    if (exportNames.indexOf(k) >= 0) return;
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
var z = 100;
exports.z = z;
class a {}
exports.a = a;
function b() {}
var d = 42;
exports.d = d;
var e = 1,
  f = 2;
exports.f = f;
exports.e = e;
function _default() {}
