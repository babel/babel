import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import objectWithoutPropertiesLoose from "./objectWithoutPropertiesLoose.js";
function _objectWithoutProperties(t, r) {
  if (null == t) return {};
  var o,
    n,
    i = objectWithoutPropertiesLoose(t, r);
  if (_Object$getOwnPropertySymbols) {
    var l = _Object$getOwnPropertySymbols(t);
    for (n = 0; n < l.length; n++) o = l[n], -1 === _indexOfInstanceProperty(r).call(r, o) && {}.propertyIsEnumerable.call(t, o) && (i[o] = t[o]);
  }
  return i;
}
export { _objectWithoutProperties as default };