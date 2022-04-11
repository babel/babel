class Foo {
  #m;
  init() {
    this.#m = (...args) => args;
  }
  static test() {
    const f = new Foo();
    f.init();
    return f.#m?.(...arguments);
  }

  static testNull() {
    const f = new Foo();
    return f.#m?.(...arguments);
  }
}
