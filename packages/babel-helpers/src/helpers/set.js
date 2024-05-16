/* @minVersion 7.0.0-beta.0 */

import superPropBase from "superPropBase";
import defineProperty from "defineProperty";

function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = superPropBase(target, property);
      var desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
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

  return set(target, property, value, receiver);
}

export default function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);
  if (!s && isStrict) {
    throw new TypeError("failed to set property");
  }

  return value;
}
