/* @minVersion 7.0.0-beta.0 */

import toPropertyKey from "./toPropertyKey.ts";

interface Prop extends PropertyDescriptor {
  key: PropertyKey;
}

function _defineProperties(target: object, props: Prop[]): void {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}

export default function _createClass<T extends new (...args: any[]) => any>(
  Constructor: T,
  protoProps?: Prop[],
  staticProps?: Prop[],
): T {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
