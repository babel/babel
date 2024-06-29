/* @minVersion 7.9.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

type NonArrayIterable<V, T extends Iterable<V> = Iterable<V>> =
  T extends Array<any> ? never : Iterable<V>;

export default function _unsupportedIterableToArray<T>(
  o: RelativeIndexable<T> /* string | typedarray */ | ArrayLike<T> | Set<T>,
  minLen?: number | null,
): T[];
export default function _unsupportedIterableToArray<T, K>(
  o: Map<K, T>,
  minLen?: number | null,
): [K, T][];
// This is a specific overload added specifically for createForOfIteratorHelpers.ts
export default function _unsupportedIterableToArray<T>(
  o: NonArrayIterable<T>,
  minLen?: number | null,
): undefined;
export default function _unsupportedIterableToArray(
  o: any,
  minLen?: number | null,
): any[] | undefined {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray<string>(o, minLen);
  var name = Object.prototype.toString.call(o).slice(8, -1);
  if (name === "Object" && o.constructor) name = o.constructor.name;
  if (name === "Map" || name === "Set") return Array.from(o);
  if (
    name === "Arguments" ||
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(name)
  ) {
    return arrayLikeToArray(o, minLen);
  }
}
