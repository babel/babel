class C {
  static #x = "x";
  static #y = [];
  static #z;
  static self = C;
  static #self() {
    return C;
  }
  static {
    var [_p, _p2,, _p3] = [this, this],
      x = (_p === void 0 ? C.self : _p).#x,
      [, _p4] = _p2.#y,
      _m = (_p4 === void 0 ? C.self : _p4).#z,
      y = _m === void 0 ? C.#self() : _m,
      z = _p3 === void 0 ? y.#y : _p3;
  }
}
