class C {
  static #x = 42;
  static {
    let y;
    for (let x = (y = C.#x, C).#x;;) {
      break;
    }
    ;
  }
}
