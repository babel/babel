'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  z: true,
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true
};

var _mod = require('mod');

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
exports.b = b;
Object.defineProperty(exports, 'c', {
  enumerable: true,
  get: function () {
    return _mod.c;
  }
});

exports.default = function () {};

var z = exports.z = 100;
class a {}
exports.a = a;
function b() {}
var d = exports.d = 42;
var e = exports.e = 1,
    f = exports.f = 2;
exports.g = f;