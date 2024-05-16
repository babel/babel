/* @minVersion 7.0.0-beta.0 */

export default function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};

  var target = {};

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }

  return target;
}
