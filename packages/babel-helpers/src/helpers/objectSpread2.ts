/* @minVersion 7.5.0 */

// @ts-expect-error Migrate in another PR
import defineProperty from "defineProperty";

// This function is different to "Reflect.ownKeys". The enumerableOnly
// filters on symbol properties only. Returned string properties are always
// enumerable. It is good to use in objectSpread.

function ownKeys(
  object: object,
  enumerableOnly?: boolean | undefined,
): PropertyKey[] {
  var keys: PropertyKey[] = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        // sym already comes from `Object.getOwnPropertySymbols`, so getOwnPropertyDescriptor should always be defined
        return Object.getOwnPropertyDescriptor(object, sym)!.enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

export default function _objectSpread2<T extends {}, U>(
  target: T,
  source: U,
): T & U;
export default function _objectSpread2<T extends {}, U, V>(
  target: T,
  source1: U,
  source2: V,
): T & U & V;
export default function _objectSpread2<T extends {}, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W;
export default function _objectSpread2(target: object, ...sources: any[]): any;
export default function _objectSpread2(target: object) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          // key already comes from ownKeys, so getOwnPropertyDescriptor should always be defined
          Object.getOwnPropertyDescriptor(source, key)!,
        );
      });
    }
  }
  return target;
}
