import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import toPropertyKey from "./toPropertyKey.js";
export default function _defineEnumerableProperties(e, r) {
  for (var t in r) {
    var o = r[t];
    o.configurable = o.enumerable = !0, "value" in o && (o.writable = !0), _Object$defineProperty(e, t, o);
  }
  if (_Object$getOwnPropertySymbols) for (var n = _Object$getOwnPropertySymbols(r), a = 0; a < n.length; a++) {
    var i = n[a];
    (o = r[i]).configurable = o.enumerable = !0, "value" in o && (o.writable = !0), _Object$defineProperty(e, toPropertyKey(i), o);
  }
  return e;
}