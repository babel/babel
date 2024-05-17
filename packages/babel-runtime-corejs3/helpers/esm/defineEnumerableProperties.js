import _createForOfIteratorHelper from "./createForOfIteratorHelper.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import toPropertyKey from "./toPropertyKey.js";
export default function _defineEnumerableProperties(e, r) {
  for (var t in r) {
    var o = r[t];
    o.configurable = o.enumerable = !0, "value" in o && (o.writable = !0), _Object$defineProperty(e, t, o);
  }
  if (_Object$getOwnPropertySymbols) {
    var n = _Object$getOwnPropertySymbols(r);
    var _iterator = _createForOfIteratorHelper(n),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _t = _step.value;
        (o = r[_t]).configurable = o.enumerable = !0, "value" in o && (o.writable = !0), _Object$defineProperty(e, toPropertyKey(_t), o);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return e;
}