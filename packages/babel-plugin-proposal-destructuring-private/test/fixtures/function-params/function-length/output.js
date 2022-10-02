class C {
  static #x;
  static 0(..._p) {
    var [..._p2] = _p,
      x = _p2[0].#x;
  }
  static 1(a, b = 1, _p3, ..._p4) {
    var x = _p3.#x,
      c = _p4;
  }
  static 2(a, b, _p5 = void 0) {
    var x = (_p5 === void 0 ? C : _p5).#x;
  }
  static 3(a, b, _p6, _p7 = void 0) {
    var x = _p6.#x,
      c = _p7 === void 0 ? 1 : _p7;
  }
}
