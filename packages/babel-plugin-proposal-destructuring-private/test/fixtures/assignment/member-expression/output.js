let x;
class C {
  static #x;
  static #y;
  static #z;
  static {
    var _ref, _ref2;
    let z;
    var _ref3 = [0, C];
    [C.#x, _ref, ..._ref2] = _ref3;
    x = _ref.#x;
    z = _ref2;
  }
}
