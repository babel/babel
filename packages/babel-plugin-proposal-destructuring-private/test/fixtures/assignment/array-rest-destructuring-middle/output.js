let x, y, z;
class C {
  static #x;
  static {
    var _ref, _ref2;
    [{
      y
    }, _ref, ..._ref2] = [{
      y: 1
    }, C];
    var _ref$x = _ref.#x;
    x = _ref$x === void 0 ? y : _ref$x;
    z = _ref2;
  }
}
