import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
export default function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (_indexOfInstanceProperty(e).call(e, n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}