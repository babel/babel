var result;
class C {
  static #x;
  static {
    var _m, _m2;
    var x;
    result = (_m = C, _m2 = _m.#x, x = _m2 === void 0 ? 2 : _m2, _m);
  }
}
