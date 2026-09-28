import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
function _interopRequireWildcard(e, r) {
  if ("function" == typeof _WeakMap) var t = new _WeakMap();
  return (_interopRequireWildcard = function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    var n,
      i,
      o = _Object$defineProperty,
      u = {
        __proto__: null,
        "default": e
      };
    if (Object(e) !== e) return u;
    if (t) {
      if (t.has(e)) return t.get(e);
      t.set(e, u);
    }
    for (i in e) "default" !== i && {}.hasOwnProperty.call(e, i) && ((n = o && _Object$getOwnPropertyDescriptor(e, i)) && (n.get || n.set) ? o(u, i, n) : u[i] = e[i]);
    return u;
  })(e, r);
}
export { _interopRequireWildcard as default };