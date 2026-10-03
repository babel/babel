import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
var cache;
function _interopRequireWildcard(e, t) {
  if (!t && e && e.__esModule) return e;
  var r,
    c,
    a = _Object$defineProperty,
    n = {
      __proto__: null,
      "default": e
    };
  if (Object(e) !== e) return n;
  if (cache || "function" != typeof _WeakMap || (cache = new _WeakMap()), cache) {
    if (cache.has(e)) return cache.get(e);
    cache.set(e, n);
  }
  for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && _Object$getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]);
  return n;
}
export { _interopRequireWildcard as default };