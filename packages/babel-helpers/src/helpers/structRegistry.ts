/* @minVersion 8.2.0 */
/* @internal */

// Shared state of the struct helpers. It lives on the global object so that
// structs compiled with different copies of the helpers (e.g. inlined in two
// different files) can extend each other. All the mutable state is kept in
// closures and weak collections, so that it still works when the registry
// object is frozen (e.g. by SES's harden).

export interface StructMeta {
  // The struct constructor
  k: Function;
  // The [[Prototype]] of the struct constructor when it was defined
  h: unknown;
  // The meta of the parent struct, or undefined for base structs
  p: StructMeta | undefined;
  // Instances of this struct and of its subclasses ([[StructBrands]])
  b: WeakSet<object>;
  // Returns the method running the instance field initializers
  f: ((instance: object) => Function) | undefined;
  // The computed keys of the fields
  fk: PropertyKey[] | undefined;
  // Returns the user-defined "constructor" method ([[StructInitializer]])
  i: ((instance: object) => Function) | undefined;
  // The metas of the struct and of its ancestors, starting from the base struct
  c: StructMeta[];
  // The registry the struct is defined in. It differs from the registry of
  // its parent when they are defined in different realms.
  r: StructRegistry;
}

export interface PendingStruct {
  // The instance
  i: object;
  // The struct being constructed
  k: Function;
  // Whether the base constructor already returned the instance
  d?: boolean;
}

export interface StructRegistry {
  // [[IsStructConstructor]]
  s: WeakMap<Function, StructMeta>;
  // Gets and sets the instance currently being created by constructStruct
  g: () => PendingStruct | undefined;
  x: (pending: PendingStruct | undefined) => void;
  // The superclass of base structs, and of structs extending null
  o: Function;
  n: Function;
  // Returns the meta of a struct defined in any realm, or undefined
  l: (struct: unknown) => StructMeta | undefined;
  // The wrappers of the private methods, by wrapped method
  w: WeakMap<Function, Function>;
}

declare const self: unknown;

export default function _structRegistry(): StructRegistry {
  // After the first call, _structRegistry is replaced by a function holding
  // the registry. It is read from the binding rather than by calling it,
  // because the other helpers can hold a reference to the original function
  // (e.g. when using the CommonJS build of @babel/runtime).
  if (Object.prototype.hasOwnProperty.call(_structRegistry, "r")) {
    return (_structRegistry as any).r;
  }

  // The version must be updated when changing the registry or StructMeta.
  var key = Symbol["for"]("babel.structs@1");
  var root: any =
    typeof globalThis === "object"
      ? globalThis
      : typeof self === "object"
        ? self
        : typeof global === "object"
          ? global
          : undefined;
  var registry: StructRegistry = root && root[key];
  if (!registry) {
    var current: PendingStruct | undefined;
    // During the creation of a struct instance, the constructor of the base
    // struct calls super() to install the private elements, and this
    // function returns the instance being created.
    // It is reset immediately, since user code can run while the remaining
    // fields are installed (e.g. with the setPublicClassFields assumption).
    // When the struct chain spans multiple realms, the pending instance is
    // shared by their registries: mark it as used for all of them.
    var base = function () {
      var pending = current;
      if (!pending || pending.d) throw new TypeError("Illegal constructor");
      pending.d = true;
      current = undefined;
      return pending.i;
    };
    var baseNull = function () {
      return base();
    };
    base.prototype = Object.prototype;
    baseNull.prototype = null;
    var structs = new WeakMap<Function, StructMeta>();
    registry = {
      s: structs,
      g: function () {
        return current;
      },
      x: function (pending) {
        current = pending;
      },
      // They are shared by all the base structs
      o: base,
      n: baseNull,
      l: function (struct) {
        var meta = structs.get(struct as Function);
        if (meta) return meta;
        // Structs from other realms (e.g. iframes or Node.js vm contexts) are
        // in the registry of their realm, which is stored on the base of
        // their constructor [[Prototype]] chain. The chain only contains
        // functions with source text: stop at native functions, which include
        // proxies, so that no proxy trap runs. Source text cannot have the
        // NativeFunction syntax, since `[native code]` is not valid code.
        var other: StructRegistry | undefined;
        for (
          var proto = struct;
          typeof proto === "function" &&
          !/^\s*function\b[^{]*\{\s*\[native code\]\s*\}\s*$/.test(
            Function.prototype.toString.call(proto),
          );
          proto = Object.getPrototypeOf(proto)
        ) {
          // The base functions are frozen, and are the last functions of the
          // chain: a static field of a frozen struct with the same key comes
          // before them. Only read data properties, so that no user-defined
          // getter runs.
          var desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc && "value" in desc && !desc.writable && !desc.configurable) {
            other = desc.value;
          }
        }
        if (other !== registry) {
          try {
            // Only read a data property here too: `other` can be any value
            // of a frozen function that is not a struct.
            return WeakMap.prototype.get.call(
              Object.getOwnPropertyDescriptor(other, "s")!.value,
              struct as Function,
            );
          } catch (_) {
            // Not a registry: the function is not a struct
          }
        }
      },
      w: new WeakMap(),
    };
    Object.defineProperty(base, key, { value: registry });
    Object.defineProperty(baseNull, key, { value: registry });
    Object.freeze(base);
    Object.freeze(baseNull);
    try {
      Object.defineProperty(root, key, { value: registry });
    } catch (_) {
      // The global object is not available or not extensible: this copy of
      // the helpers has its own registry, which is still found through the
      // base of the structs.
    }
  }
  var getRegistry = function () {
    return registry;
  };
  (getRegistry as any).r = registry;
  // @ts-expect-error assign to function
  _structRegistry = getRegistry;
  return registry;
}
