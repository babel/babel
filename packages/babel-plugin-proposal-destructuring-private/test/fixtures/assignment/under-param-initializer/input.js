let a;
class C {
  static #x = { a: 1, b: 2 };
  static {
    let b;
    (function f(r = { #x: { b }} = C) {})()
  }
  static m(r = { #x: { a } } = C) {}
}
C.m();
