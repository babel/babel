class C {
  static a = "a";
  static #x;
  static {
    var x,
      a = "a";
    for (const _ref of [C]) {
      x = _ref.#x, {
        [a]: a
      } = _ref;
      {
        const a = "A";
      }
    }
  }
}
