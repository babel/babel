/* @minVersion 8.2.0 */

import structRegistry from "./structRegistry.ts";

// super(...args) in the constructor of a struct: it returns a function
// running the user-defined constructor of the parent struct on the same
// instance. GetSuperConstructor() reads the [[Prototype]] of the
// initializer, which is the parent struct when the struct was defined.
export default function _structSuper(struct: Function, instance: object) {
  var meta = structRegistry().s.get(struct);
  var parent = meta && meta.p;
  return function () {
    if (!parent) throw new TypeError("Super constructor is not a constructor");
    return parent.i
      ? Reflect.apply(parent.i(instance), instance, arguments)
      : undefined;
  };
}
