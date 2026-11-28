/* @minVersion 8.2.0 */

import structRegistry from "./structRegistry.ts";
import wrapStructMethod from "./wrapStructMethod.ts";

// Struct instance private methods are struct method exotic objects too. The
// struct defines a private getter in place of the method, which returns the
// wrapper of the original method: the wrapper is created on the first access
// and shared by all the instances.
export default function _structPrivateMethod(
  struct: Function,
  method: Function,
  name: string,
) {
  var registry = structRegistry();
  var wrapper = registry.w.get(method);
  if (!wrapper) {
    wrapper = wrapStructMethod(method, registry.s.get(struct)!.b, name);
    registry.w.set(method, wrapper);
  }
  return wrapper;
}
