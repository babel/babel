"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  g: true,
  f: true,
  b: true,
  B: true,
  ns: true
};
exports.b = exports.B = void 0;
exports.f = f;
exports.g = g;
exports.ns = void 0;
var _somewhere = require("somewhere");
var _ns = babelHelpers.interopRequireWildcard(require("somewhere else"));
exports.ns = _ns;
Object.keys(_ns).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ns[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ns[key];
    }
  });
});
function f() {
  a;
  B;
}
function h() {
  b;
  A;
}
function g() {
  c;
}
try {
  var _usingCtx = babelHelpers.usingCtx();
  (0, _somewhere.doSomething)();
  var {
    b
  } = {};
  var c = 2;
  var A = class A {};
  var B = class B {};
  var x = _usingCtx.u(null);
} catch (_) {
  _usingCtx.e = _;
} finally {
  _usingCtx.d();
}
