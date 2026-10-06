/* @minVersion 7.5.0 */

import defineProperty from "./defineProperty.ts";

// This function is different to "Reflect.ownKeys". The enumerableOnly
// filters on symbol properties only. Returned string properties are always
// enumerable. It is good to use in objectSpread.

function ownKeys(
  object: object,
  enumerableOnly?: boolean | undefined,
): (string | symbol)[] {
  var keys: (string | symbol)[] = Object.keys(object);
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

type Intersection<R extends any[]> = R extends [infer H, ...infer S]
  ? H & Intersection<S>
  : unknown;

export default function _objectSpread2<T extends object, U extends unknown[]>(
  target: T,
  ...sources: U
): T & Intersection<U>;
export default function _objectSpread2(target: object) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      source = Object(source);
      var keys: (string | symbol)[];
      if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
        keys = Reflect.ownKeys(source);
      } else {
        keys = Object.getOwnPropertyNames(source);
        if (Object.getOwnPropertySymbols) {
          keys.push.apply(keys, Object.getOwnPropertySymbols(source));
        }
      }
      keys.forEach(function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(source, key);
        if (descriptor && descriptor.enumerable) {
          defineProperty(target, key, source[key]);
        }
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
