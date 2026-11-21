/* @minVersion 8.2.0 */

import structRegistry, {
  type PendingStruct,
  type StructMeta,
  type StructRegistry,
} from "./structRegistry.ts";

// Called by the constructor of a struct. Returns the new instance, or
// undefined when the constructor is called by another constructStruct call
// to install the private elements, in which case the constructor must call
// super().
export default function _constructStruct(
  struct: Function,
  newTarget: Function | undefined,
  args: ArrayLike<unknown>,
) {
  var registry = structRegistry();
  var pending = registry.g();
  // User code can run while installing the private elements (e.g. a
  // Symbol.hasInstance method called by the ES5 class lowering), so check
  // that this call comes from the instance creation of the same struct.
  if (pending && !pending.d && pending.k === newTarget) return;

  var meta = registry.s.get(struct);
  if (newTarget !== struct || !meta) {
    throw new TypeError(
      "Struct constructors cannot be used with a different new.target",
    );
  }

  var chain = meta.c;
  var i;
  // The private elements are installed by running the class constructors,
  // which call their [[Prototype]] via super(): if it has been modified,
  // restore it while creating the instance, so that no user code runs.
  var modified: StructMeta[] = [];
  var originalProtos: unknown[] = [];
  for (i = 0; i < chain.length; i++) {
    var proto = Object.getPrototypeOf(chain[i].k);
    if (proto !== chain[i].h) {
      modified.push(chain[i]);
      originalProtos.push(proto);
    }
  }

  var instance = Object.create(struct.prototype);

  // Install the private methods and declare the fields of all the structs in
  // the chain: the class constructors receive `instance` from the base class
  // via super(). When the chain spans multiple realms, the constructors use
  // the registries of their realms.
  var registries: StructRegistry[] = [];
  var pendings: (PendingStruct | undefined)[] = [];
  for (i = 0; i < chain.length; i++) {
    if (registries.indexOf(chain[i].r) === -1) {
      registries.push(chain[i].r);
      pendings.push(chain[i].r.g());
    }
  }
  var current: PendingStruct = { i: instance, k: struct };
  for (i = 0; i < registries.length; i++) registries[i].x(current);
  try {
    for (i = 0; i < modified.length; i++) {
      // Throws if the constructor is not extensible anymore
      Object.setPrototypeOf(modified[i].k, modified[i].h as object | null);
    }
    Reflect.construct(struct, [], struct);
  } finally {
    for (i = 0; i < registries.length; i++) registries[i].x(pendings[i]);
    for (i = 0; i < modified.length; i++) {
      try {
        Object.setPrototypeOf(
          modified[i].k,
          originalProtos[i] as object | null,
        );
      } catch (_) {}
    }
  }

  for (i = 0; i < chain.length; i++) chain[i].b.add(instance);
  Object.seal(instance);
  for (i = 0; i < chain.length; i++) {
    if (chain[i].f) {
      Reflect.apply(chain[i].f!(instance), instance, chain[i].fk || []);
    }
  }
  if (meta.i) Reflect.apply(meta.i(instance), instance, args);

  return instance;
}
