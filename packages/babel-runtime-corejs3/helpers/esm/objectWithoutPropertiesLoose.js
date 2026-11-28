import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function _objectWithoutPropertiesLoose(e, r) {
  if (null == e) return {};
  var t = {};
  for (var o in e) if ({}.hasOwnProperty.call(e, o)) {
    if (-1 !== _indexOfInstanceProperty(r).call(r, o)) continue;
    "__proto__" === o ? _Object$defineProperty(t, o, {
      value: e[o],
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[o] = e[o];
  }
  return t;
}
export { _objectWithoutPropertiesLoose as default };