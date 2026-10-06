import _Object$getOwnPropertyNames from "core-js-pure/features/object/get-own-property-names.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$getOwnPropertyDescriptor from "core-js-pure/features/object/get-own-property-descriptor.js";
function _objectWithoutPropertiesLoose(e, r) {
  if (null == e) return {};
  for (var t = {}, o = _Object$getOwnPropertyNames(e = Object(e)), n = 0; n < o.length; n++) {
    var i = o[n];
    if (-1 === _indexOfInstanceProperty(r).call(r, i)) {
      var u = _Object$getOwnPropertyDescriptor(e, i);
      u && u.enumerable && (t[i] = e[i]);
    }
  }
  return t;
}
export { _objectWithoutPropertiesLoose as default };