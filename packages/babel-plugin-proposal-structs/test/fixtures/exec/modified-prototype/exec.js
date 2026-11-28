struct O {
  #o = 1;
  static has(x) {
    return #o in x;
  }
}
struct D {
  y = 2;
}

// Modifying the [[Prototype]] of a struct constructor does not affect the
// creation of its instances
let called = false;
const fn = function () {
  called = true;
  return new O();
};
Object.setPrototypeOf(D, fn);
const d = new D();
expect(called).toBe(false);
expect(d.y).toBe(2);
expect(O.has(d)).toBe(false);
expect(Object.getPrototypeOf(D)).toBe(fn);

struct S {
  x = 1;
}
Object.setPrototypeOf(S, Function.prototype);
expect(new S().x).toBe(1);
expect(Object.getPrototypeOf(S)).toBe(Function.prototype);

// It cannot be restored once the constructor is frozen
Object.freeze(S);
expect(() => new S()).toThrow(TypeError);
