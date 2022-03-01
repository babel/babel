var _m2;

let a;

class C {
  static #x = {
    a: 1,
    b: 2
  };
  static {
    var _m;

    let b;

    (function f(r = (_m = C, ({
      b
    } = C.#x), _m)) {})();

  }

  static m(r = (_m2 = C, ({
    a
  } = C.#x), _m2)) {}

}

C.m();
