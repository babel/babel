/* @minVersion 8.2.0 */
/* @internal */

import setFunctionName from "./setFunctionName.ts";

// Creates a struct method exotic object, which checks that the receiver is an
// instance of the struct before calling the wrapped method.
export default function _wrapStructMethod(
  method: Function,
  brand: WeakSet<object>,
  // The property key, or the description of the private name
  name: PropertyKey,
) {
  // Getters are not constructors and have no "prototype" property, even when
  // the helpers are compiled to ES5.
  var wrapper = Object.getOwnPropertyDescriptor(
    {
      get m() {
        if (!brand.has(this)) {
          throw new TypeError(
            "Struct method called on an incompatible receiver",
          );
        }
        return Reflect.apply(method, this, arguments);
      },
    },
    "m",
  )!.get!;
  // Struct method exotic objects inherit from the [[Prototype]] of the
  // wrapped method, and their only own property is the "name" defined by
  // MethodDefinitionEvaluation.
  // In ES5 engines, "length" is not configurable.
  try {
    delete (wrapper as any).length;
  } catch (_) {}
  setFunctionName(wrapper, name as string | symbol);
  Object.setPrototypeOf(wrapper, Object.getPrototypeOf(method));
  return wrapper;
}
