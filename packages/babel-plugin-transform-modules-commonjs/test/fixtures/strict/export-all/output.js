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
  "default": true,
  c: true,
  __esModule: true
};

function _exportFromThis(key) {
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === this[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: () => this[key]
  });
}

exports.b = b;
exports.default = _default;

function _export(key, get) {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get
  });
}

_export("c", () => _mod.c);

exports.f = exports.e = exports.d = exports.a = exports.z = void 0;

var _mod = require("mod");

Object.keys(_mod).forEach(_exportFromThis, _mod);
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
