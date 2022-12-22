/* @minVersion 7.20.7 */

export default function _defineAccessor(type, obj, key, fn) {
  var desc = { configurable: true, enumerable: true };
  // type should be "get" or "set"
  desc[type] = fn;
  return Object.defineProperty(obj, key, desc);
}
