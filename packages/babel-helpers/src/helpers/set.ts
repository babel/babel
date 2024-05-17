/* @minVersion 7.0.0-beta.0 */

import defineProperty from "./defineProperty.ts";
import superPropBase from "./superPropBase.ts";

type Object = {
  __proto__?: any;
} & { [key: string]: unknown };

function set<T extends Object, P extends PropertyKey>(
  target: T,
  property: P,
  value: P extends keyof T ? T[P] : any,
  receiver?: any,
): boolean {
  var _setImpl = set;

  if (typeof Reflect !== "undefined" && Reflect.set) {
    _setImpl = Reflect.set;
  } else {
    _setImpl = function set(target, property, value, receiver) {
      var base = superPropBase(target, property);
      var desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc && desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc || !desc.writable) {
          // Both getter and non-writable fall into this.
          return false;
        }
      }

      // Without a super that defines the property, spec boils down to
      // "define on receiver" for some reason.
      desc = Object.getOwnPropertyDescriptor(receiver, property);
      if (desc) {
        if (!desc.writable) {
          // Setter, getter, and non-writable fall into this.
          return false;
        }

        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        // Avoid setters that may be defined on Sub's prototype, but not on
        // the instance.
        defineProperty(receiver, property, value);
      }

      return true;
    };
  }

  return _setImpl(target, property, value, receiver);
}

export default function _set(
  target: Object,
  property: PropertyKey,
  value: any,
  receiver?: any,
  isStrict: boolean = false,
) {
  var s = set(target, property, value, receiver || target);
  if (!s && isStrict) {
    throw new TypeError("failed to set property");
  }

  return value;
}
