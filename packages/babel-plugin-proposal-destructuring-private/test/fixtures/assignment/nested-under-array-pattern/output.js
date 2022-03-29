class C {
  static #x = "x";
  static #y = [];
  static #z;
  static self = C;

  static #self() {
    return C;
  }

  static {
    var _p, _p2, _p3, _m, _p4, _m2, _m3;

    let x, y, z;
    [_p, _p2,, _p3] = [this, this], _m = _p === void 0 ? C.self : _p, x = _m.#x, [, _p4] = _p2.#y, _m2 = _p4 === void 0 ? C.self : _p4, _m3 = _m2.#z, y = _m3 === void 0 ? C.#self() : _m3, z = _p3 === void 0 ? y.#y : _p3;
  }
}
