struct S extends null {
  x = 1;
}
const s = new S();
expect(Object.getPrototypeOf(S.prototype)).toBe(null);
expect(Object.getPrototypeOf(s)).toBe(S.prototype);
expect(s.x).toBe(1);

struct T extends null {
  constructor() {
    super();
  }
}
expect(() => new T()).toThrow(TypeError);

struct U {}
expect(Object.getPrototypeOf(U.prototype)).toBe(Object.prototype);
