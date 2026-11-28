struct S {}
const base = Object.getPrototypeOf(S);
expect(Object.isFrozen(base)).toBe(true);
expect(() => {
  "use strict";
  base.prototype = Array.prototype;
}).toThrow(TypeError);
expect(() => base()).toThrow(TypeError);
struct N extends null {}
expect(Object.isFrozen(Object.getPrototypeOf(N))).toBe(true);
