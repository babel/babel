class C {
  static #x = 1;
  static {
    const { #x: void, y } = C;
    const { #x: void } = C;
  }
}
