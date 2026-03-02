import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== _indexOfInstanceProperty(e).call(e, n)) continue;
    t[n] = r[n];
  }
  return t;
}
export { _objectWithoutPropertiesLoose as default };