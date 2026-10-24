class C {
  static #x = "x";
  static #y = [];
  static #z;
  static self = C;
  static #self() {
    return C;
  }
  static {
    var [_ref, _ref2,, _ref3] = [this, this],
      _ref5 = _ref === void 0 ? C.self : _ref,
      x = _ref5.#x,
      [, _ref4] = _ref2.#y,
      _ref6 = _ref4 === void 0 ? C.self : _ref4,
      _ref6$z = _ref6.#z,
      y = _ref6$z === void 0 ? C.#self() : _ref6$z,
      z = _ref3 === void 0 ? y.#y : _ref3;
  }
}
