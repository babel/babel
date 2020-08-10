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

    expect((Foo?.#m)()).toEqual(1);
    expect((Foo?.#m)().toString).toEqual(1..toString);
    expect((Foo?.#m)().toString()).toEqual('1');

    expect((o?.Foo.#m)()).toEqual(1);
    expect((o?.Foo.#m)().toString).toEqual(1..toString);
    expect((o?.Foo.#m)().toString()).toEqual('1');

    expect((((o.Foo?.self.getSelf)())?.#m)()).toEqual(1);
    expect((((o.Foo.self?.getSelf)())?.#m)()).toEqual(1);

    expect((((fn()?.Foo?.self.getSelf)())?.#m)()).toEqual(1);
    expect((((fn?.().Foo.self?.getSelf)())?.#m)()).toEqual(1);
  }

  testNull() {
    const o = null;
    const fn = function () {
      return { o };
    }

    expect(() => { (o?.Foo.#m)() }).toThrow();
    expect(() => { (o?.Foo.#m)().toString }).toThrow();
    expect(() => { (o?.Foo.#m)().toString() }).toThrow();

    expect(() => { (((o.Foo?.self.getSelf)())?.#m)() }).toThrow();
    expect(() => { (((o.Foo.self?.getSelf)())?.#m)() }).toThrow();

    expect(() => (((fn()?.Foo?.self.getSelf)())?.#m)()).toThrow();
    expect(() => (((fn?.().Foo.self?.getSelf)())?.#m)()).toThrow();
  }
}

(new Foo).test();
(new Foo).testNull();
