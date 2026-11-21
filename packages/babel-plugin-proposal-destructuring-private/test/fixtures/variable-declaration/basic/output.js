class C {
  static #x;
  static {
    var {
        a = 1
      } = C,
      _C$x = C.#x,
      x = _C$x === void 0 ? 2 : _C$x,
      {
        b = 3
      } = C;
  }
}
