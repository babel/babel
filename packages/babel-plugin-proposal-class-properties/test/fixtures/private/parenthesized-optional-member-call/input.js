class Foo {
  static #x = 1;

  static self = Foo;
  static #m = function() { return this.#x; };
  static getSelf() { return Foo }

  test() {
    const o = { Foo: Foo };
    const fn = function () {
      return o;
    };

    (Foo?.#m)();
    (Foo?.#m)().toString;
    (Foo?.#m)().toString();

    (o?.Foo.#m)();
    (o?.Foo.#m)().toString;
    (o?.Foo.#m)().toString();

    (((o.Foo?.self.getSelf)())?.#m)();
    (((o.Foo.self?.getSelf)())?.#m)();

    (((fn()?.Foo?.self.getSelf)())?.#m)();
    (((fn?.().Foo.self?.getSelf)())?.#m)();
  }
}

(new Foo).test();
