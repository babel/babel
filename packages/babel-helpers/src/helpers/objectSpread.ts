/* @minVersion 7.0.0-beta.0 */
/* @onlyBabel7 */

// @ts-expect-error Migrate in another PR
import defineProperty from "defineProperty.ts";

export default function _objectSpread<T extends {}, U>(
  target: T,
  source: U,
): T & U;
export default function _objectSpread<T extends {}, U, V>(
  target: T,
  source1: U,
  source2: V,
): T & U & V;
export default function _objectSpread<T extends {}, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W;
export default function _objectSpread(target: object, ...sources: any[]): any;
export default function _objectSpread(target: object) {
  for (var i = 1; i < arguments.length; i++) {
    var source: object = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys: PropertyKey[] = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys.push.apply(
        ownKeys,
        Object.getOwnPropertySymbols(source).filter(function (sym) {
          // sym already comes from `Object.getOwnPropertySymbols`, so getOwnPropertyDescriptor should always be defined
          return Object.getOwnPropertyDescriptor(source, sym)!.enumerable;
        }),
      );
    }
    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key as keyof typeof source]);
    });
  }
  return target;
}
