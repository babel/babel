"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Foo", {
  enumerable: true,
  get: function () {
    return _moduleWithGetter.default;
  }
});
Object.defineProperty(exports, "baz", {
  enumerable: true,
  get: function () {
    return _moduleWithGetter.baz;
  }
});
var _moduleWithGetter = _interopRequireWildcard(require("./moduleWithGetter"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var n, o, i = Object.defineProperty, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (r) { if (r.has(e)) return r.get(e); r.set(e, f); } for (o in e) "default" !== o && {}.hasOwnProperty.call(e, o) && ((n = i && Object.getOwnPropertyDescriptor(e, o)) && (n.get || n.set) ? i(f, o, n) : f[o] = e[o]); return f; })(e, t); }
