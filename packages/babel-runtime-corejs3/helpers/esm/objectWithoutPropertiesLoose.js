import _includesInstanceProperty from "core-js-pure/features/instance/includes.js";
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (_includesInstanceProperty(e).call(e, n)) continue;
    t[n] = r[n];
  }
  return t;
}
export { _objectWithoutPropertiesLoose as default };