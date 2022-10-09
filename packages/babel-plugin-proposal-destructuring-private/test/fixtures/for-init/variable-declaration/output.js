class C {
  static #x;
  static {
    for (let x = C.#x;;) {
      break;
    }
  }
}
