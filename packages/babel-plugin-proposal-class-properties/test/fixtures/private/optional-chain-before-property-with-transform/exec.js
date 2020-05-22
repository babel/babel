class Foo {
  static #x = 1;
  static #self = Foo;
  static self = Foo;
  static getSelf() { return this }

  static test() {
    const o = { Foo: Foo };
    const deep = { very: { o } };
    function fn() {
      return o;
    }
    function fnDeep() {
      return deep;
    }

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

    expect(o?.Foo.#self.getSelf().#x).toEqual(1);
    expect(o?.Foo.#self.getSelf?.().#x).toEqual(1);
    expect(o?.Foo.#self?.getSelf().#x).toEqual(1);
    expect(o?.Foo.#self?.getSelf?.().#x).toEqual(1);
    expect(o?.Foo.#self.getSelf()?.self.#x).toEqual(1);
    expect(o?.Foo.#self.getSelf?.()?.self.#x).toEqual(1);
    expect(o?.Foo.#self?.getSelf()?.self.#x).toEqual(1);
    expect(o?.Foo.#self?.getSelf?.()?.self.#x).toEqual(1);

    expect(fn?.().Foo.#x).toEqual(1);
    expect(fn?.().Foo.#x.toString).toEqual(1..toString);
    expect(fn?.().Foo.#x.toString()).toEqual('1');

    expect(fnDeep?.().very.o?.Foo.#x).toEqual(1);
    expect(fnDeep?.().very.o?.Foo.#x.toString).toEqual(1..toString);
    expect(fnDeep?.().very.o?.Foo.#x.toString()).toEqual('1');

    expect(fn?.().Foo.#self.#x).toEqual(1);
    expect(fn?.().Foo.#self.self.#x).toEqual(1);
    expect(fn?.().Foo.#self?.self.#x).toEqual(1);
    expect(fn?.().Foo.#self.self?.self.#x).toEqual(1);
    expect(fn?.().Foo.#self?.self?.self.#x).toEqual(1);

    expect(fn?.().Foo.#self.getSelf().#x).toEqual(1);
    expect(fn?.().Foo.#self.getSelf?.().#x).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf().#x).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf?.().#x).toEqual(1);
    expect(fn?.().Foo.#self.getSelf()?.self.#x).toEqual(1);
    expect(fn?.().Foo.#self.getSelf?.()?.self.#x).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf()?.self.#x).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf?.()?.self.#x).toEqual(1);
  }

  static testNull() {
    const o = null;;
    const deep = { very: { o } };
    const fn = null;
    function fnDeep() {
      return deep;
    }

    expect(o?.Foo.#x).toEqual(undefined);
    expect(o?.Foo.#x.toString).toEqual(undefined);
    expect(o?.Foo.#x.toString()).toEqual(undefined);

    expect(deep?.very.o?.Foo.#x).toEqual(undefined);
    expect(deep?.very.o?.Foo.#x.toString).toEqual(undefined);
    expect(deep?.very.o?.Foo.#x.toString()).toEqual(undefined);

    expect(o?.Foo.#self.#x).toEqual(undefined);
    expect(o?.Foo.#self.self.#x).toEqual(undefined);
    expect(o?.Foo.#self?.self.#x).toEqual(undefined);
    expect(o?.Foo.#self.self?.self.#x).toEqual(undefined);
    expect(o?.Foo.#self?.self?.self.#x).toEqual(undefined);

    expect(o?.Foo.#self.getSelf().#x).toEqual(undefined);
    expect(o?.Foo.#self.getSelf?.().#x).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf().#x).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf?.().#x).toEqual(undefined);
    expect(o?.Foo.#self.getSelf()?.self.#x).toEqual(undefined);
    expect(o?.Foo.#self.getSelf?.()?.self.#x).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf()?.self.#x).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf?.()?.self.#x).toEqual(undefined);

    expect(fn?.().Foo.#x).toEqual(undefined);
    expect(fn?.().Foo.#x.toString).toEqual(undefined);
    expect(fn?.().Foo.#x.toString()).toEqual(undefined);

    expect(fnDeep?.().very.o?.Foo.#x).toEqual(undefined);
    expect(fnDeep?.().very.o?.Foo.#x.toString).toEqual(undefined);
    expect(fnDeep?.().very.o?.Foo.#x.toString()).toEqual(undefined);

    expect(fn?.().Foo.#self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self.self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self?.self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self.self?.self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self?.self?.self.#x).toEqual(undefined);

    expect(fn?.().Foo.#self.getSelf().#x).toEqual(undefined);
    expect(fn?.().Foo.#self.getSelf?.().#x).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf().#x).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf?.().#x).toEqual(undefined);
    expect(fn?.().Foo.#self.getSelf()?.self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self.getSelf?.()?.self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf()?.self.#x).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf?.()?.self.#x).toEqual(undefined);
  }
}

Foo.test();
Foo.testNull();
