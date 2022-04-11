class A {
  static #method() {}

  run() {
    A.#method = 2;
    ([A.#method] = [2]);
  }
}
