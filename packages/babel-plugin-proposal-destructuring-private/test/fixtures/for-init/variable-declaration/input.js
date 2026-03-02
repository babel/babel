class C {
  static #x;
  static {
    for (let { #x: x } = C;;) { break; }
  }
}
