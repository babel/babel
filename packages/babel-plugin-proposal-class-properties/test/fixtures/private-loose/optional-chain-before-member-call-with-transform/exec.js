class Foo {
  static #x = 1;
  static #m = function() { return this.#x; };
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

    expect(o?.Foo.#m()).toEqual(1);
    expect(o?.Foo.#m().toString).toEqual(1..toString);
    expect(o?.Foo.#m().toString()).toEqual('1');

    expect(deep?.very.o?.Foo.#m()).toEqual(1);
    expect(deep?.very.o?.Foo.#m().toString).toEqual(1..toString);
    expect(deep?.very.o?.Foo.#m().toString()).toEqual('1');

    expect(o?.Foo.#self.#m()).toEqual(1);
    expect(o?.Foo.#self.self.#m()).toEqual(1);
    expect(o?.Foo.#self?.self.#m()).toEqual(1);
    expect(o?.Foo.#self.self?.self.#m()).toEqual(1);
    expect(o?.Foo.#self?.self?.self.#m()).toEqual(1);

    expect(o?.Foo.#self.getSelf().#m()).toEqual(1);
    expect(o?.Foo.#self.getSelf?.().#m()).toEqual(1);
    expect(o?.Foo.#self?.getSelf().#m()).toEqual(1);
    expect(o?.Foo.#self?.getSelf?.().#m()).toEqual(1);
    expect(o?.Foo.#self.getSelf()?.self.#m()).toEqual(1);
    expect(o?.Foo.#self.getSelf?.()?.self.#m()).toEqual(1);
    expect(o?.Foo.#self?.getSelf()?.self.#m()).toEqual(1);
    expect(o?.Foo.#self?.getSelf?.()?.self.#m()).toEqual(1);

    expect(fn?.().Foo.#m()).toEqual(1);
    expect(fn?.().Foo.#m().toString).toEqual(1..toString);
    expect(fn?.().Foo.#m().toString()).toEqual('1');

    expect(fnDeep?.().very.o?.Foo.#m()).toEqual(1);
    expect(fnDeep?.().very.o?.Foo.#m().toString).toEqual(1..toString);
    expect(fnDeep?.().very.o?.Foo.#m().toString()).toEqual('1');

    expect(fn?.().Foo.#self.#m()).toEqual(1);
    expect(fn?.().Foo.#self.self.#m()).toEqual(1);
    expect(fn?.().Foo.#self?.self.#m()).toEqual(1);
    expect(fn?.().Foo.#self.self?.self.#m()).toEqual(1);
    expect(fn?.().Foo.#self?.self?.self.#m()).toEqual(1);

    expect(fn?.().Foo.#self.getSelf().#m()).toEqual(1);
    expect(fn?.().Foo.#self.getSelf?.().#m()).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf().#m()).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf?.().#m()).toEqual(1);
    expect(fn?.().Foo.#self.getSelf()?.self.#m()).toEqual(1);
    expect(fn?.().Foo.#self.getSelf?.()?.self.#m()).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf()?.self.#m()).toEqual(1);
    expect(fn?.().Foo.#self?.getSelf?.()?.self.#m()).toEqual(1);
  }

  static testNull() {
    const o = null;;
    const deep = { very: { o } };
    const fn = null;
    function fnDeep() {
      return deep;
    }

    expect(o?.Foo.#m()).toEqual(undefined);
    expect(o?.Foo.#m().toString).toEqual(undefined);
    expect(o?.Foo.#m().toString()).toEqual(undefined);

    expect(deep?.very.o?.Foo.#m()).toEqual(undefined);
    expect(deep?.very.o?.Foo.#m().toString).toEqual(undefined);
    expect(deep?.very.o?.Foo.#m().toString()).toEqual(undefined);

    expect(o?.Foo.#self.#m()).toEqual(undefined);
    expect(o?.Foo.#self.self.#m()).toEqual(undefined);
    expect(o?.Foo.#self?.self.#m()).toEqual(undefined);
    expect(o?.Foo.#self.self?.self.#m()).toEqual(undefined);
    expect(o?.Foo.#self?.self?.self.#m()).toEqual(undefined);

    expect(o?.Foo.#self.getSelf().#m()).toEqual(undefined);
    expect(o?.Foo.#self.getSelf?.().#m()).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf().#m()).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf?.().#m()).toEqual(undefined);
    expect(o?.Foo.#self.getSelf()?.self.#m()).toEqual(undefined);
    expect(o?.Foo.#self.getSelf?.()?.self.#m()).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf()?.self.#m()).toEqual(undefined);
    expect(o?.Foo.#self?.getSelf?.()?.self.#m()).toEqual(undefined);

    expect(fn?.().Foo.#m()).toEqual(undefined);
    expect(fn?.().Foo.#m().toString).toEqual(undefined);
    expect(fn?.().Foo.#m().toString()).toEqual(undefined);

    expect(fnDeep?.().very.o?.Foo.#m()).toEqual(undefined);
    expect(fnDeep?.().very.o?.Foo.#m().toString).toEqual(undefined);
    expect(fnDeep?.().very.o?.Foo.#m().toString()).toEqual(undefined);

    expect(fn?.().Foo.#self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self.self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self?.self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self.self?.self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self?.self?.self.#m()).toEqual(undefined);

    expect(fn?.().Foo.#self.getSelf().#m()).toEqual(undefined);
    expect(fn?.().Foo.#self.getSelf?.().#m()).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf().#m()).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf?.().#m()).toEqual(undefined);
    expect(fn?.().Foo.#self.getSelf()?.self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self.getSelf?.()?.self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf()?.self.#m()).toEqual(undefined);
    expect(fn?.().Foo.#self?.getSelf?.()?.self.#m()).toEqual(undefined);
  }
}

Foo.test();
Foo.testNull();
