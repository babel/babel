class Foo {
  static #m = function () { return this; };

  test() {
    const o = { Foo: Foo };

    expect((Foo?.#m)``).toBe(Foo);
    expect((o?.Foo.#m)``).toBe(Foo);
    expect((o.Foo?.#m)``).toBe(Foo);
  }

  testNull() {
    const o = null;

    expect(() => (o?.Foo.#m)``).toThrow(TypeError);
  }
}

new Foo().test();
new Foo().testNull();
