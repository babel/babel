class C {
  static a = "a";
  static #x;
  static {
    const a = "a";
    for (const { #x: x, [a]: _ } of [C]) {
      const a = "A";
    }
  }
}
