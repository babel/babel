class C {
  static #x = "x";
  static #y = [];
  static #z;
  static self = C;
  static #self() {
    return C;
  }
  static {
    var _ref, _ref2, _ref3, _ref4, _ref4$z;
    let x, y, z;
    [_ref = C.self, _ref2,, _ref3] = [this, this], x = _ref.#x, [, _ref4 = C.self] = _ref2.#y, y = (_ref4$z = _ref4.#z) === void 0 ? C.#self() : _ref4$z, z = _ref3 === void 0 ? y.#y : _ref3;
  }
}
