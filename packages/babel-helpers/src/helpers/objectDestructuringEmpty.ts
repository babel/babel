/* @minVersion 7.0.0-beta.0 */

export default function _objectDestructuringEmpty<T>(
  obj: T | null | undefined,
): asserts obj is T {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
}
