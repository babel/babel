class C {
  static #x;
  static {
    var [_ref, ...z] = [C],
      _ref$x = _ref.#x,
      x = _ref$x === void 0 ? 1 : _ref$x;
  }
}
