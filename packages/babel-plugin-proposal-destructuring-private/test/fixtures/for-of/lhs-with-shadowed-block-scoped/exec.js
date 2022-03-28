class C {
  static a = "a";
  static #x;
  static {
    var x, a = "a";
    for ({ #x: x, [a]: a } of [C]) {
      const a = "A";
    }
  }
}
