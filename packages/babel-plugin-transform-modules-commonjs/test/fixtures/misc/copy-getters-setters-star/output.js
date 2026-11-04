"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
var foo = _interopRequireWildcard(require("./moduleWithGetter"));
exports.foo = foo;
var e;
function _interopRequireWildcard(t, r) { if (!r && t && t.__esModule) return t; var n, a, o = Object.defineProperty, f = { __proto__: null, default: t }; if (Object(t) !== t) return f; if (e || "function" != typeof WeakMap || (e = new WeakMap()), e) { if (e.has(t)) return e.get(t); e.set(t, f); } for (a in t) "default" !== a && {}.hasOwnProperty.call(t, a) && ((n = o && Object.getOwnPropertyDescriptor(t, a)) && (n.get || n.set) ? o(f, a, n) : f[a] = t[a]); return f; }
