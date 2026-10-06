import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function _objectWithoutPropertiesLoose(e, r) {
  if (null == e) return {};
  var t = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (-1 !== _indexOfInstanceProperty(r).call(r, n)) continue;
    _Object$defineProperty(t, n, {
      value: e[n],
      enumerable: !0,
      configurable: !0,
      writable: !0
    });
  }
  return t;
}
export { _objectWithoutPropertiesLoose as default };