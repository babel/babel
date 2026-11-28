/* @minVersion 8.2.0 */

import structRegistry, { type StructMeta } from "./structRegistry.ts";
import wrapStructMethod from "./wrapStructMethod.ts";

// Called at the beginning of the static elements of a struct, after all the
// class elements have been defined.
export default function _defineStruct(
  struct: Function,
  // Whether to seal the prototype now, when there are no static elements
  seal: boolean,
  // Return the #fields and #init methods
  initializeFields?: (instance: object) => Function,
  initializer?: (instance: object) => Function,
  // The keys of the instance methods, in definition order. The keys of
  // the methods not defined via DefineMethod (getters, setters, generators
  // and async methods) are wrapped in an array, and only listed when they
  // could override a method defined via DefineMethod.
  methodKeys?: (PropertyKey | [PropertyKey])[],
  // The computed keys of the fields, passed to initializeFields
  fieldKeys?: PropertyKey[],
) {
  var registry = structRegistry();
  var proto = Object.getPrototypeOf(struct);
  var parent = registry.l(proto);
  var brand = new WeakSet<object>();
  var meta: StructMeta = {
    k: struct,
    h: proto,
    p: parent,
    b: brand,
    f: initializeFields,
    fk: fieldKeys,
    i: initializer,
    c: [],
    r: registry,
  };
  meta.c = parent ? parent.c.concat([meta]) : [meta];
  // Also register the struct in the registries of its ancestors, so that it
  // can be found from their realms.
  for (var i = 0; i < meta.c.length; i++) meta.c[i].r.s.set(struct, meta);

  // Struct instance methods are struct method exotic objects, which check
  // that the receiver is an instance of the struct. Only the last definition
  // of a key matters.
  if (methodKeys) {
    var isMethod = new Map<PropertyKey, boolean>();
    for (i = 0; i < methodKeys.length; i++) {
      var key = methodKeys[i];
      if (Array.isArray(key)) isMethod.set(key[0], false);
      else isMethod.set(key, true);
    }
    isMethod.forEach(function (method, key) {
      if (method) {
        var desc = Object.getOwnPropertyDescriptor(struct.prototype, key)!;
        desc.value = wrapStructMethod(desc.value, brand, key);
        Object.defineProperty(struct.prototype, key, desc);
      }
    });
  }

  if (seal) Object.seal(struct.prototype);
}
