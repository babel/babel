"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
var foo = _interopRequireWildcard(require("./moduleWithGetter"));
exports.foo = foo;
function _interopRequireWildcard(e, r) { if ("function" == typeof WeakMap) var t = new WeakMap(); return (_interopRequireWildcard = function (e, r) { if (!r && e && e.__esModule) return e; var n, i, o = Object.defineProperty, u = { __proto__: null, default: e }; if (Object(e) !== e) return u; if (t) { if (t.has(e)) return t.get(e); t.set(e, u); } for (i in e) "default" !== i && {}.hasOwnProperty.call(e, i) && ((n = o && Object.getOwnPropertyDescriptor(e, i)) && (n.get || n.set) ? o(u, i, n) : u[i] = e[i]); return u; })(e, r); }
