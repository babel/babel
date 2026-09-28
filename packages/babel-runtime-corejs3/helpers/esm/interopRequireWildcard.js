import _typeof from "./typeof.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
function _interopRequireWildcard(e, t) {
  if ("function" == typeof _WeakMap) var r = new _WeakMap();
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e;
    var n,
      o,
      i = _Object$defineProperty,
      f = {
        __proto__: null,
        "default": e
      };
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
    if (r) {
      if (r.has(e)) return r.get(e);
      r.set(e, f);
    }
    for (o in e) "default" !== o && {}.hasOwnProperty.call(e, o) && ((n = i && _Object$getOwnPropertyDescriptor(e, o)) && (n.get || n.set) ? i(f, o, n) : f[o] = e[o]);
    return f;
  })(e, t);
}
export { _interopRequireWildcard as default };