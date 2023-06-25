"use strict";

0 && (module.exports = { c: _ });
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = ["z", "a", "b", "d", "e", "f", "c"];
exports.a = void 0;
exports.b = b;
_export("c", function () {
  return _mod.c;
});
exports.d = void 0;
exports.default = _default;
exports.z = exports.f = exports.e = void 0;
__exportStar(require("mod"));
var _mod = _lastRequired;
var _lastRequired;
function __exportStar(mod) {
  return _reexports(exports, _lastRequired = mod, _exportNames);
}
function _reexports(exports, mod, exportNames) {
  var _loop = function (k) {
    if (k === "default" || k === "__esModule" || exportNames.indexOf(k) >= 0) return "continue";
    k in exports && exports[k] === mod[k] || Object.defineProperty(exports, k, {
      get: function () {
        return mod[k];
      },
      enumerable: true
    });
  };
  for (var k in mod) {
    var _ret = _loop(k);
    if (_ret === "continue") continue;
  }
}
function _export(name, fn) {
  Object.defineProperty(exports, name, {
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
