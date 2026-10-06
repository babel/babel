/* @minVersion 7.0.0-beta.0 */

export default function _objectWithoutProperties(
  source: null | undefined,
  excluded: PropertyKey[],
): Record<string, never>;
export default function _objectWithoutProperties<
  T extends object,
  K extends PropertyKey[],
>(
  source: T | null | undefined,
  excluded: K,
): Pick<T, Exclude<keyof T, K[number]>>;
export default function _objectWithoutProperties<
  T extends object,
  K extends PropertyKey[],
>(
  source: T | null | undefined,
  excluded: K,
): Pick<T, Exclude<keyof T, K[number]>> | Record<string, never> {
  if (source == null) return {};

  source = Object(source) as T;
  var target = {} as Pick<T, Exclude<keyof T, K[number]>>;
  var sourceKeys: PropertyKey[];
  var key, i;

  // Snapshot all keys before property reads; getters can change later keys.
  if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
    sourceKeys = Reflect.ownKeys(source);
  } else {
    sourceKeys = Object.getOwnPropertyNames(source);
    if (Object.getOwnPropertySymbols) {
      sourceKeys = sourceKeys.concat(Object.getOwnPropertySymbols(source));
    }
  }

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i] as keyof typeof source & keyof typeof target;
    if (excluded.indexOf(key) !== -1) continue;
    var desc = Object.getOwnPropertyDescriptor(source, key);
    if (desc && desc.enumerable) {
      target[key] = source[key];
    }
  }

  return target;
}
