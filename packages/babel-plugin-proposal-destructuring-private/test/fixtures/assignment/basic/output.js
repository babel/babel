let a, x, b;
class C {
  static #x;
  static {
    var _C$x;
    ({
      a = 1
    } = C), x = (_C$x = C.#x) === void 0 ? 2 : _C$x, {
      b = 3
    } = C;
  }
}
