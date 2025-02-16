var result;
class C {
  static #x;
  static {
    var x;
    {
      var _m, _m2, _temp;
      _temp = (_m = C, _m2 = _m.#x, x = _m2 === void 0 ? 2 : _m2, _m);
    }
    result = _temp;
  }
}
