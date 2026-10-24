class C {
  static #x = 42;
  static {
    let x, y;
    for (x = (y = C.#x, C).#x;;) {
      break;
    }
  }
}
