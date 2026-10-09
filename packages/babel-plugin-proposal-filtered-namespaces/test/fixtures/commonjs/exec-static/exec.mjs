import { b, a } as ns from "./dep.cjs";
import { increment } from "./dep.cjs";

expect(Object.keys(ns)).toEqual(["a", "b"]);
expect("c" in ns).toBe(false);
expect(Object.getPrototypeOf(ns)).toBe(null);
expect(Object.isFrozen(ns)).toBe(true);
expect(Object.prototype.toString.call(ns)).toBe("[object Module]");
expect(Object.getOwnPropertyDescriptor(ns, Symbol.toStringTag)).toEqual({
  value: "Module",
  writable: false,
  enumerable: false,
  configurable: false,
});

// Live bindings
expect(ns.a).toBe(1);
increment();
expect(ns.a).toBe(2);
