function B() {}
B.b = function() {
  return 'B.b';
};

class C extends B {}

expect(Object.getPrototypeOf(C)).toBe(B);
expect(Object.getPrototypeOf(C.prototype)).toBe(B.prototype);

expect(C.b()).toBe('B.b');

class D extends Object {}

expect(D).toBeInstanceOf(Object);
expect(D.prototype).toBeInstanceOf(Object);
expect(D.keys).toBe(Object.keys);

class E {}

expect(Object.getPrototypeOf(E)).toBe(Function.prototype);
expect(Object.getPrototypeOf(E.prototype)).toBe(Object.prototype);
expect(E).not.toContain('keys');
