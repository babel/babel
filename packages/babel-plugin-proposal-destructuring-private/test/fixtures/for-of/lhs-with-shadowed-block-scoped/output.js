class C {
  static a = "a";
  static #x;
  static {
    var x,
      a = "a";
    for (var _ref of [C]) {
      var _ref2 = _ref;
      x = _ref2.#x;
      ({
        [a]: a
      } = _ref2);
      {
        const a = "A";
      }
    }
  }
}
