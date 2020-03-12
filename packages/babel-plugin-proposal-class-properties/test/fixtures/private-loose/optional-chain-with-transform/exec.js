class Foo {
  static #x = 1;
  static #self = Foo;
  static self = Foo;

  static test() {
    const o = { Foo: Foo };
    const deep = { very: { o } };
    expect(o?.Foo.#x).toEqual(1);
    expect(o?.Foo.#x.toString).toEqual(1..toString);
    expect(o?.Foo.#x.toString()).toEqual('1');

    expect(deep?.very.o?.Foo.#x).toEqual(1);
    expect(deep?.very.o?.Foo.#x.toString).toEqual(1..toString);
    expect(deep?.very.o?.Foo.#x.toString()).toEqual('1');

    expect(o?.Foo.#self.#x).toEqual(1);
    expect(o?.Foo.#self.self.#x).toEqual(1);
    expect(o?.Foo.#self?.self.#x).toEqual(1);
    expect(o?.Foo.#self.self?.self.#x).toEqual(1);
    expect(o?.Foo.#self?.self?.self.#x).toEqual(1);
  }
}

Foo.test();
