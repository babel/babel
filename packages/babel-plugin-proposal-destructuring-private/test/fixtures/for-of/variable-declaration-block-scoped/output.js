class C {
  static a = "a";
  static #x;
  static {
    const a = "a";
    for (const _ref of [C]) {
      const x = _ref.#x,
        {
          [a]: _
        } = _ref;
      {
        const a = "A";
      }
    }
  }
}
