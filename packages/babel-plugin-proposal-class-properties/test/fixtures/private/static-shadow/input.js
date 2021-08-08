class Test {

  static #x = 1

  method() {
    const Test = 1;
    return this.#x;
  }
}
