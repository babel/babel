let key = "computed";

struct S {
  a = 1;
  b;
  [key] = 3;
  method() {}
}

const s = new S();
expect(Object.isSealed(s)).toBe(true);
expect(Object.isFrozen(s)).toBe(false);
expect(Object.keys(s)).toEqual(["a", "b", "computed"]);
expect(Object.getOwnPropertyDescriptor(s, "a")).toEqual({
  value: 1,
  writable: true,
  enumerable: true,
  configurable: false,
});
expect(s.b).toBeUndefined();
expect(s.computed).toBe(3);

s.a = 2;
expect(s.a).toBe(2);
expect(() => {
  "use strict";
  s.c = 1;
}).toThrow(TypeError);
expect(() => {
  "use strict";
  delete s.a;
}).toThrow(TypeError);
expect(Object.getPrototypeOf(s)).toBe(S.prototype);
expect(s instanceof S).toBe(true);
