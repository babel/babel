class Foo {
  #m() {
    return this;
  }
  #f = function () {
    return this;
  };
  run() {
    return [(this.#m as any)(), this.#m!(), (this.#f as any)()];
  }
}
