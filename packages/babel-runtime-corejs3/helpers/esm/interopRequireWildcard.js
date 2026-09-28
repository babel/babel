import _typeof from "./typeof.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
function _interopRequireWildcard(e, t) {
  if ("function" == typeof _WeakMap) var r = new _WeakMap(),
    n = new _WeakMap();
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e;
    var o,
      i,
      f,
      u = {
        __proto__: null,
        "default": e
      };
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return u;
    if (o = t ? n : r) {
      if (o.has(e)) return o.get(e);
      o.set(e, u);
    }
    for (f in e) "default" !== f && {}.hasOwnProperty.call(e, f) && ((i = (o = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, f)) && (i.get || i.set) ? o(u, f, i) : u[f] = e[f]);
    return u;
  })(e, t);
}
export { _interopRequireWildcard as default };