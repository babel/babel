/* @minVersion 8.2.0 */

import structRegistry from "./structRegistry.ts";

// Returns the class heritage for a struct: `_structHeritage()` when there is
// no `extends` clause, `_structHeritage(superClass)` otherwise.
export default function _structHeritage(superClass?: unknown) {
  var registry = structRegistry();
  if (arguments.length === 0) return registry.o;
  if (superClass === null) return registry.n;
  if (!registry.l(superClass)) {
    throw new TypeError("Structs can only extend other structs or null");
  }
  return superClass as Function;
}
