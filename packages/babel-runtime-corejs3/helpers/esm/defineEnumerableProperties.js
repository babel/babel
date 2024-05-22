import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
function _defineEnumerableProperties(e, r) {
  for (var t in r) {
    var n = r[t];
    n.configurable = n.enumerable = !0, "value" in n && (n.writable = !0), _Object$defineProperty(e, t, n);
  }
  if (_Object$getOwnPropertySymbols) for (var a = _Object$getOwnPropertySymbols(r), b = 0; b < a.length; b++) {
    var i = a[b];
    (n = r[i]).configurable = n.enumerable = !0, "value" in n && (n.writable = !0), _Object$defineProperty(e, i, n);
  }
  return e;
}
export { _defineEnumerableProperties as default };