"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverse = void 0;
__exportStar(require("./traverse/x"));
_interop = 1;
var _traverse = __exportStar(require("./traverse/traverse"));
_export("traverse", _traverse, "default");
var _interop;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function __exportStar(mod) {
  mod = _interop == 1 ? _interopRequireWildcard(mod) : mod;
  Object.keys(mod).forEach(function (k) {
    if (["default", "__esModule", "traverse"].indexOf(k) < 0 && !(k in exports && exports[k] === mod[k])) {
      Object.defineProperty(exports, k, {
        get() {
          return mod[k];
        },
        enumerable: true
      });
    }
  });
  return mod;
}
function _export(name, mod, name2) {
  Object.defineProperty(exports, name, {
    enumerable: true,
    get() {
      return mod[name2 == null ? name : name2];
    }
  });
}
