class Foo {
  static #m = function () { return this; };

  test() {
    const o = { Foo: Foo };

    (Foo?.#m)``;
    (o?.Foo.#m)``;
    (o.Foo?.#m)``;
  }
}

new Foo().test();
