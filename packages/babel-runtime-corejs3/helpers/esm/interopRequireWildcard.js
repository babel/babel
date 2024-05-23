import _typeof from "./typeof.js";
import _WeakMap from "core-js-pure/features/weak-map/index.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
var _getRequireWildcardCache2 = function _getRequireWildcardCache(e) {
  if ("function" != typeof _WeakMap) return null;
  var r = new _WeakMap(),
    t = new _WeakMap();
  return (_getRequireWildcardCache2 = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
};
function _interopRequireWildcard(e, r) {
  if (!r && e && "object" == _typeof(e) && "__esModule" in e) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache2(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null,
      "default": e
    },
    i = "defineProperty" in Object ? _Object$getOwnPropertyDescriptor : void 0;
  for (var a in e) if ("default" !== a && {}.hasOwnProperty.call(e, a)) {
    var o = i ? _Object$getOwnPropertyDescriptor(e, a) : null;
    o && (o.get || o.set) ? _Object$defineProperty(n, a, o) : n[a] = e[a];
  }
  return t && t.set(e, n), n;
}
export { _interopRequireWildcard as default };