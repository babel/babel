let a;
class C {
  static #x = {
    a: 1,
    b: 2
  };
  static {
    let b;
    (function f(r = ({
      b
    } = C.#x, C)) {})();
  }
  static m(r = ({
    a
  } = C.#x, C)) {}
}
C.m();
