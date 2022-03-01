class C {
  static #x;
  static {
    var _m = [C],
        [_p, ..._p2] = _m,
        _m2 = _p.#x,
        x = _m2 === void 0 ? 1 : _m2,
        z = _p2;
  }
}
