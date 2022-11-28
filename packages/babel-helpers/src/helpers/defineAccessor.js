/* @minVersion 7.20.6 */

export default function _defineAccessor(obj, key, type, fn) {
  var desc = { configurable: true, enumerable: true };
  // type should be "get" or "set"
  desc[type] = fn;
  return Object.defineProperty(obj, key, desc);
}
