let x;

class C {
  static #x;
  static #y;
  static #z;
  static {
    var _m, _p, _p2, _p3;

    let z;
    _m = [0, C], [_p, _p2, ..._p3] = _m, C.#x = _p, x = _p2.#x, z = _p3;
  }
}
