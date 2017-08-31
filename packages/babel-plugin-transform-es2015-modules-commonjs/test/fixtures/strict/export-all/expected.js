"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = ['z', 'a', 'b', 'c', 'd', 'e', 'f'];

var _mod = require("mod");

Object.keys(_mod).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (_exportNames.indexOf(key) !== -1) return;
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
