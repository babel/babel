let x;
class C {
  static #x;
  static #y;
  static #z;
  static {
    var _ref, _ref2;
    let z;
    [C.#x, _ref, ..._ref2] = [0, C];
    x = _ref.#x;
    z = _ref2;
  }
}
