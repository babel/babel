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

expect(Foo.test(1, 2)).toEqual([1, 2]);
expect(Foo.testNull(1, 2)).toBe(undefined);
