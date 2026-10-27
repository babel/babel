class C {
  static #x;
  static 0(...[..._ref]) {
    var x = _ref[0].#x;
  }
  static 1(a, b = 1, _ref2, ...c) {
    var x = _ref2.#x;
  }
  static 2(a, b, _ref3 = C) {
    var x = _ref3.#x;
  }
  static 3(a, b, _ref4, c = 1) {
    var x = _ref4.#x;
  }
}
