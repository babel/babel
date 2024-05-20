/* @minVersion 7.0.0-beta.0 */
/* @onlyBabel7 */

import defineProperty from "./defineProperty.ts";

type Intersection<R extends any[]> = R extends [infer H, ...infer S]
  ? H & Intersection<S>
  : unknown;

export default function _objectSpread<T extends object, U extends unknown[]>(
  target: T,
  ...sources: U
): T & Intersection<U>;
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
