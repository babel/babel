class C {
  static #x = 1;
  static {
    var _ref2;
    const [_ref, void, b] = [C, 2, 3],
      a = _ref.#x;
    let c, d;
    [_ref2, void, d] = [C, 2, 3];
    c = _ref2.#x;
  }
}
