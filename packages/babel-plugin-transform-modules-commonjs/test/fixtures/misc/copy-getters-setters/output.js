"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baz = exports.Foo = void 0;
var _moduleWithGetter = _interopRequireWildcard(require("./moduleWithGetter"));
_export("Foo", _moduleWithGetter, "default");
_export("baz", _moduleWithGetter);
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _export(name, mod, name2) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get() {
      return mod[name2 == null ? name : name2];
    }
  });
}
