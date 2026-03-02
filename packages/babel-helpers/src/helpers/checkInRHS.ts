/* @minVersion 7.20.5 */

export default function _checkInRHS(value: unknown) {
  if (Object(value) !== value) {
    throw TypeError(
      "right-hand side of 'in' should be an object, got " +
        (value !== null ? typeof value : "null"),
    );
  }
  return value;
}
