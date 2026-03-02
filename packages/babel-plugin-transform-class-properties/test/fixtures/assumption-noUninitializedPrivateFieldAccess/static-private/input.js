class A {
  static #x = 2;

  static dynamicCheck() {
    this.#x;
    this.#x = 2;
    [this.#x] = [];
  }

  static noCheck() {
    A.#x;
    A.#x = 2;
    [A.#x] = [];
  }
}
