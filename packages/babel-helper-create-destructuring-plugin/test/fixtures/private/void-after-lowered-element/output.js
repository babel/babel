class C {
  static #x = 1;
  static {
    var _ref3, _ref4;
    const [_ref, void, _ref2] = [C, 2, 3],
      a = _ref.#x,
      b = _ref2;
    let c, d;
    [_ref3, void, _ref4] = [C, 2, 3];
    c = _ref3.#x;
    d = _ref4;
  }
}
