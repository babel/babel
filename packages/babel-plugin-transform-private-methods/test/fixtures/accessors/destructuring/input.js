class A {
  set #setter(v) {}
  get #getter() {}

  m() {
    [this.#setter] = [1];
    [this.#getter] = [1];
  }
}
