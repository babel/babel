class C {
  static #x;
  static {
    var {
        a = 1
      } = C,
      _m = C.#x,
      x = _m === void 0 ? 2 : _m,
      {
        b = 3
      } = C;
  }
}
