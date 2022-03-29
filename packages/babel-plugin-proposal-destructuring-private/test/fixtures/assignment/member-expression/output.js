let x;

class C {
  static #x;
  static #y;
  static #z;
  static {
    var _m, _p, _p2;

    let z;
    _m = [0, C], [C.#x, _p, ..._p2] = _m, x = _p.#x, z = _p2;
  }
}
