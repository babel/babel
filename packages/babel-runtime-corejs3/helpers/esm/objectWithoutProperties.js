import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import objectWithoutPropertiesLoose from "./objectWithoutPropertiesLoose.js";
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = objectWithoutPropertiesLoose(e, t);
  if (_Object$getOwnPropertySymbols) {
    var b = _Object$getOwnPropertySymbols(e);
    for (r = 0; r < b.length; r++) o = b[r], -1 === _indexOfInstanceProperty(t).call(t, o) && {}.propertyIsEnumerable.call(e, o) && _Object$defineProperty(i, o, {
      value: e[o],
      enumerable: !0,
      configurable: !0,
      writable: !0
    });
  }
  return i;
}
export { _objectWithoutProperties as default };