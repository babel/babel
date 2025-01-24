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
  K extends Array<keyof T>,
>(source: T | null | undefined, excluded: K): Omit<T, K[number]>;
export default function _objectWithoutPropertiesLoose<T extends object>(
  source: T | null | undefined,
  excluded: PropertyKey[],
): Partial<T> {
  if (source == null) return {};

  var target: Partial<T> = {};

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) !== -1) continue;
      target[key] = source[key];
    }
  }

  return target;
}
