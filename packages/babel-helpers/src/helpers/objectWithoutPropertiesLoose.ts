/* @minVersion 7.0.0-beta.0 */

export default function _objectWithoutPropertiesLoose<
  T extends object,
  K extends PropertyKey[],
>(
  source: T | null | undefined,
  excluded: K,
): Pick<T, Exclude<keyof T, K[number]>>;
export default function _objectWithoutPropertiesLoose<
  T extends object,
  K extends (keyof T)[],
>(source: T | null | undefined, excluded: K): Omit<T, K[number]>;
export default function _objectWithoutPropertiesLoose<T extends object>(
  source: T | null | undefined,
  excluded: PropertyKey[],
): Partial<T> {
  if (source == null) return {};

  source = Object(source) as T;
  var target: Partial<T> = {};
  var sourceKeys = Object.getOwnPropertyNames(source);

  for (var i = 0; i < sourceKeys.length; i++) {
    var key = sourceKeys[i] as keyof typeof source;
    if (excluded.indexOf(key) !== -1) continue;
    var desc = Object.getOwnPropertyDescriptor(source, key);
    if (desc && desc.enumerable) {
      target[key] = source[key];
    }
  }

  return target;
}
