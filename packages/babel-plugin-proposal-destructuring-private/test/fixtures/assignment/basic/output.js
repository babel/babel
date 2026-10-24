let a, x, b;
class C {
  static #x;
  static {
    ({
      a = 1
    } = C);
    var _C$x = C.#x;
    x = _C$x === void 0 ? 2 : _C$x;
    ({
      b = 3
    } = C);
  }
}
