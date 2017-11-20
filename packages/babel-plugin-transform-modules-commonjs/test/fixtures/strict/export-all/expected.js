"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  z: true,
  a: true,
  b: true,
  d: true,
  e: true,
  f: true,
  c: true
};
exports.b = b;
exports.default = _default;
exports.f = exports.e = exports.d = exports.a = exports.z = void 0;
Object.defineProperty(exports, "c", {
  enumerable: true,
  get: function () {
    return _mod.c;
  }
});

var _mod = require("mod");

Object.keys(_mod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mod[key];
    }
  });
});
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
