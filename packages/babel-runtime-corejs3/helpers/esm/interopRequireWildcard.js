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
      i = t ? n : r,
      f = {
        __proto__: null,
        "default": e
      };
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
    if (i) {
      if (i.has(e)) return i.get(e);
      i.set(e, f);
    }
    for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((o = (i = _Object$defineProperty) && _Object$getOwnPropertyDescriptor(e, _t)) && (o.get || o.set) ? i(f, _t, o) : f[_t] = e[_t]);
    return f;
  })(e, t);
}
export { _interopRequireWildcard as default };