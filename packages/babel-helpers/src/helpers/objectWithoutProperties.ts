/* @minVersion 7.0.0-beta.0 */

import objectWithoutPropertiesLoose from "./objectWithoutPropertiesLoose.ts";

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

  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i] as keyof typeof source & keyof typeof target;
      if (excluded.indexOf(key) !== -1) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}
