let x;
class C {
  static #x;
  static #y;
  static #z;
  static {
    var _p, _p2;
    let z;
    [C.#x, _p, ..._p2] = [0, C], x = _p.#x, z = _p2;
  }
}
