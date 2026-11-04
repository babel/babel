import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
var e;
function _interopRequireWildcard(t, r) {
  if (!r && t && t.__esModule) return t;
  var n,
    a,
    o = _Object$defineProperty,
    f = {
      __proto__: null,
      "default": t
    };
  if (Object(t) !== t) return f;
  if (e || "function" != typeof _WeakMap || (e = new _WeakMap()), e) {
    if (e.has(t)) return e.get(t);
    e.set(t, f);
  }
  for (a in t) "default" !== a && {}.hasOwnProperty.call(t, a) && ((n = o && _Object$getOwnPropertyDescriptor(t, a)) && (n.get || n.set) ? o(f, a, n) : f[a] = t[a]);
  return f;
}
export { _interopRequireWildcard as default };