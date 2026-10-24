// The type annotations are dropped, since the fixture doesn't strip them.
let __proto__;
({ __proto__ = class {
  value;
  method(value) { return value; }
  static read() { return __proto__; }
} } = { __proto__: null });

expect(typeof __proto__).toBe("function");
expect(__proto__.name).toBe("__proto__");
expect(__proto__.read()).toBe(__proto__);
const instance = new __proto__();
expect(Object.hasOwn(instance, "value")).toBe(true);
expect(instance.value).toBeUndefined();
expect(instance.method("m")).toBe("m");
