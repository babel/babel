class C {
  static #x = "x";
  static #y = [];
  static #z;
  static self = C;

  static #self() {
    return C;
  }

  static {
    var _m, _p, _p2, _p3, _m2, _m3, _p4, _m4, _m5;

    let x, y, z;
    _m = [this, this], [_p, _p2,, _p3] = _m, _m2 = _p === void 0 ? C.self : _p, x = _m2.#x, _m3 = _p2.#y, [, _p4] = _m3, _m4 = _p4 === void 0 ? C.self : _p4, _m5 = _m4.#z, y = _m5 === void 0 ? C.#self() : _m5, z = _p3 === void 0 ? y.#y : _p3;
  }
}
