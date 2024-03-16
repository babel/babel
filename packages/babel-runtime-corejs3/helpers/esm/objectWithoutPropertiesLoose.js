import _Object$hasOwn from "core-js-pure/features/object/has-own.js";
import _indexOfInstanceProperty from "core-js-pure/features/instance/index-of.js";
export default function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var key;
  for (key in source) {
    if (_Object$hasOwn(source, key)) {
      if (_indexOfInstanceProperty(excluded).call(excluded, key) === -1) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
