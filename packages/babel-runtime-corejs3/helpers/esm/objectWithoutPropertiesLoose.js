import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
export default function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (_indexOfInstanceProperty(excluded).call(excluded, key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}