class C {
  static #x;
  static 0(..._ref) {
    var [..._ref2] = _ref,
      x = _ref2[0].#x;
  }
  static 1(a, b = 1, _ref3, ...c) {
    var x = _ref3.#x;
  }
  static 2(a, b, _ref4 = C) {
    var x = _ref4.#x;
  }
  static 3(a, b, _ref5, c = 1) {
    var x = _ref5.#x;
  }
}
