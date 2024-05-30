"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
var foo = _interopRequireWildcard(require("./moduleWithGetter"));
exports.foo = foo;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i = t ? n : r, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (i) { if (i.has(e)) return i.get(e); i.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((o = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (o.get || o.set) ? i(f, t, o) : f[t] = e[t]); return f; })(e, t); }
