/* @minVersion 8.1.0 */

import setPrototypeOf from "./setPrototypeOf.ts";

// A `__proto__` key in an object initializer updates the prototype only when
// the value is an object or null, and never creates an own property:
// https://tc39.es/ecma262/#sec-__proto__-property-names-in-object-initializers
export default function _setObjectProto<T extends object>(obj: T, proto: any) {
  if (proto === null || Object(proto) === proto) {
    setPrototypeOf(obj, proto);
  }
  return obj;
}
