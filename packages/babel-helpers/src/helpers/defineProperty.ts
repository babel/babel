/* @minVersion 7.0.0-beta.0 */
import toPropertyKey from "./toPropertyKey.ts";

export default function _defineProperty<T extends object>(
  obj: T,
  key: PropertyKey,
  value: any,
) {
  key = toPropertyKey(key);
  // Shortcircuit the slow defineProperty path when possible.
  // We are trying to avoid issues where setters defined on the
  // prototype cause side effects under the fast path of simple
  // assignment. By checking for existence of the property with
  // the in operator, we can optimize most of this overhead away.
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    // @ts-expect-error - Explicitly assigning to generic type key
    obj[key] = value;
  }
  return obj;
}
