var result;
class C {
  static #x;
  static {
    var _C$x;
    var x;
    result = (_C$x = C.#x, x = _C$x === void 0 ? 2 : _C$x, C);
  }
}
