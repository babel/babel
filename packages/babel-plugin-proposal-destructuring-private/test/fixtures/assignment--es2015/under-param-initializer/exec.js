let a,b;
class C {
  static #x = { a: 1, b: 2 };
  static {
    (function f(r = { #x: { b }} = C) {})()
  }
  static m(r = { #x: { a } } = C) {}
}
C.m();
expect(a).toBe(1);
expect(b).toBe(2);
