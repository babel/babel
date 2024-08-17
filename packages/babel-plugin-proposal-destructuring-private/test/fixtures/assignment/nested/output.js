class C {
  static #y = "y";
  static #z = "self";
  static #x;
  static b = "b";
  static self = C;
  static #self = C;
  static {
    var _m, _m2, _m3, _m4, _m5;
    let cloned, b, y, yy, yy2;
    _m = C.#x, _m2 = _m === void 0 ? C.#self : _m, _m3 = _m2[C.#z], {
      b
    } = _m3, _m4 = _m3.#x, y = _m4 === void 0 ? (C.b = "bb", C.#self.#y) : _m4, _m5 = _m2.#x, yy = _m5 === void 0 ? (delete C.self, {
      ...cloned
    } = C, C.#y = "yy") : _m5, yy2 = C.#y;
  }
}
