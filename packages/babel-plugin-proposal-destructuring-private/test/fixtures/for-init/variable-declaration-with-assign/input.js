class C {
  static #x = 42;
  static {
    let y;
    for (let { #x: x } = { #x: y } = C;;) {
      break
    };
  }
}
