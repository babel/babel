class C {
  static #x;
  static {
    var [_p, ..._p2] = [C],
      _m = _p.#x,
      x = _m === void 0 ? 1 : _m,
      z = _p2;
  }
}
