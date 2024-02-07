class A {
  #method() {}

  m() {
    [this.#method] = [1];
  }
}
