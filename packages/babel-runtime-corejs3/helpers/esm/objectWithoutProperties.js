import _Object$getOwnPropertySymbols from "core-js-pure/features/object/get-own-property-symbols.js";
import _includesInstanceProperty from "core-js-pure/features/instance/includes.js";
import objectWithoutPropertiesLoose from "./objectWithoutPropertiesLoose.js";
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = objectWithoutPropertiesLoose(e, t);
  if (_Object$getOwnPropertySymbols) {
    var s = _Object$getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], _includesInstanceProperty(t).call(t, o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
export { _objectWithoutProperties as default };