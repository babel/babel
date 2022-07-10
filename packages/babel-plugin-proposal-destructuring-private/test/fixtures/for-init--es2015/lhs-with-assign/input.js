class C {
  static #x = 42;
  static {
    let x, y;
    for ({ #x: x } = { #x: y } = C;;) { break; }
  }
}
