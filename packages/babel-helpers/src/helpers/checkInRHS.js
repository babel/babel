/* @minVersion 7.20.1 */

export default function _checkInRHS(value) {
  var type = typeof value;
  if (type !== "object" && type !== "function") {
    throw TypeError("right-hand side of 'in' should be an object, got " + type);
  }
  return value;
}
